// import React, { useEffect } from "react";
// import emailjs from "emailjs-com";

// const PayPalButton = ({ totalPrice = 0, formData, cartItems }) => {
//   useEffect(() => {
//     const loadPayPalScript = async () => {
//       const existingScript = document.querySelector(
//         'script[src="https://www.paypal.com/sdk/js?client-id=ARrQcnNYz2lXcm0aIDJjYlxDuP9gIgScjud9_180An4zLeF1xwkhzfs1eftB2ohAtSMKiQ0nJ0m7qj-L&currency=EUR"]'
//       );
//       if (existingScript) {
//         const script = document.createElement("script");
//         script.src =
//           "https://www.paypal.com/sdk/js?client-id=ARrQcnNYz2lXcm0aIDJjYlxDuP9gIgScjud9_180An4zLeF1xwkhzfs1eftB2ohAtSMKiQ0nJ0m7qj-L&currency=EUR";
//         script.async = true;
//         script.onload = () => initializePayPalButton();
//         document.body.appendChild(script);
//       } else {
//         initializePayPalButton();
//       }
//     };

//     const initializePayPalButton = () => {
//       if (window.paypal) {
//         window.paypal
//           .Buttons({
//             createOrder: (data, actions) => {
//               return actions.order.create({
//                 purchase_units: [
//                   {
//                     amount: {
//                       value: totalPrice.toFixed(2), // Ensure totalPrice is defined and a number
//                     },
//                   },
//                 ],
//               });
//             },
//             onApprove: (data, actions) => {
//               return actions.order.capture().then((details) => {
//                 console.log(
//                   "Transaction completed by",
//                   details.payer.name.given_name
//                 );

//                 // Send email to the customer
//                 //   const customerEmailParams = {
//                 //     to_email: formData.email,
//                 //     subject: "Your Order Confirmation",
//                 //     message: `Thank you for your purchase! Your order of €${totalPrice.toFixed(
//                 //       2
//                 //     )} has been confirmed.`,
//                 //   };
//                 //   emailjs
//                 //     .send(
//                 //       "service_id",
//                 //       "template_id",
//                 //       customerEmailParams,
//                 //       "user_id"
//                 //     )
//                 //     .then(
//                 //       (response) => {
//                 //         console.log(
//                 //           "Email sent to customer:",
//                 //           response.status,
//                 //           response.text
//                 //         );
//                 //       },
//                 //       (error) => {
//                 //         console.error("Failed to send email to customer:", error);
//                 //       }
//                 //     );

//                 //   // Send email to the seller/admin
//                 //   const adminEmailParams = {
//                 //     to_email: "admin@example.com",
//                 //     subject: "New Order Received",
//                 //     message: `A new order has been placed by ${
//                 //       formData.email
//                 //     } for a total of €${totalPrice.toFixed(2)}.`,
//                 //   };
//                 //   emailjs
//                 //     .send(
//                 //       "service_id",
//                 //       "template_id",
//                 //       adminEmailParams,
//                 //       "user_id"
//                 //     )
//                 //     .then(
//                 //       (response) => {
//                 //         console.log(
//                 //           "Email sent to admin:",
//                 //           response.status,
//                 //           response.text
//                 //         );
//                 //       },
//                 //       (error) => {
//                 //         console.error("Failed to send email to admin:", error);
//                 //       }
//                 //     );
//               });
//             },
//             onError: (err) => {
//               console.error("PayPal error:", err);
//             },
//           })
//           .render("#paypal-button-container");
//       }
//     };

//     loadPayPalScript();
//   }, [totalPrice, formData, cartItems]);

//   return <div id="paypal-button-container"></div>;
// };

// export default PayPalButton;

import React, { useEffect, useRef } from "react";

const PayPalButton = ({ totalPrice = 0, cartItems, formData, disabled }) => {
  const paypalRef = useRef(null);
  const initialized = useRef(false);

  console.log("FormData: ", formData);

  useEffect(() => {
    if (disabled) return;
    const loadPayPalScript = () => {
      const existingScript = document.querySelector(
        'script[src*="paypal.com/sdk/js"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=ARrQcnNYz2lXcm0aIDJjYlxDuP9gIgScjud9_180An4zLeF1xwkhzfs1eftB2ohAtSMKiQ0nJ0m7qj-L&currency=EUR`;
        script.async = true;
        script.onload = initializePayPalButton;
        document.body.appendChild(script);
      } else {
        initializePayPalButton();
      }
    };

    const initializePayPalButton = () => {
      if (window.paypal && paypalRef.current && !initialized.current) {
        try {
          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPrice.toFixed(2),
                      },
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log("Transaction completed:", order);
                // Optionally handle successful transaction here
              },
              onError: (err) => {
                console.error("PayPal error:", err);
              },
            })
            .render(paypalRef.current)
            .catch((err) =>
              console.error("Error rendering PayPal button:", err)
            );
          initialized.current = true;
        } catch (error) {
          console.error("PayPal initialization error:", error);
        }
      } else {
        console.error("PayPal SDK not loaded.");
      }
    };

    loadPayPalScript();

    // Clean up function
    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
      initialized.current = false;
    };
  }, [totalPrice]);

  return <div ref={paypalRef} id="paypal-button-container"></div>;
};

export default PayPalButton;
