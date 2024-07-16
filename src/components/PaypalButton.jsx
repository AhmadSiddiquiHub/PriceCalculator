import React, { useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PayPalButton = ({ totalPrice = 0, cartItems, formData, disabled }) => {
  const paypalRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (disabled) return;

    const loadPayPalScript = () => {
      const existingScript = document.querySelector(
        'script[src*="paypal.com/sdk/js"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${
          import.meta.env.VITE_PAYPAL_CLIENT_ID
        }&currency=EUR`;
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
                toast.success("Payment successful!");

                // Send emails
                sendEmailToCustomer();
                sendEmailToSeller();
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

    const formatCartItems = (items) => {
      return items.map((item) => ({
        name: item.name || "",
        category: item.category || "",
        dimensions: item.dimensions || "",
        color: item.color || "",
        motor: item.motor ? item.motor.name : "",
        cable: item.cable || "",
        price: item.price ? item.price.toFixed(2) : "",
        quantity: item.quantity || 0,
        image: item.image || "",
      }));
    };

    const products = formatCartItems(cartItems);

    const sendEmailToCustomer = () => {
      const templateParams = {
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        from_email: "voletmarket@bigstrategy.eu",
        to_email: formData.email,
        email: formData.email || "",
        phone: formData.phone || "",
        address: formData.address || "",
        apartment: formData.apartment || "",
        city: formData.city || "",
        postalCode: formData.postalCode || "",
        country: formData.country.label || "",
        cartItems: products,
        totalPrice: totalPrice.toFixed(2),
      };

      emailjs
        .send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_CUSTOMER_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAIL_PUBLIC_KEY
        )
        .then((response) => {
          console.log(
            "Email sent to customer successfully!",
            response.status,
            response.text
          );
        })
        .catch((err) => {
          console.error("Failed to send email to customer:", err);
        });
    };

    const sendEmailToSeller = () => {
      const templateParams = {
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        from_email: "voletmarket@bigstrategy.eu",
        email: formData.email || "",
        phone: formData.phone || "",
        address: formData.address || "",
        apartment: formData.apartment || "",
        city: formData.city || "",
        postalCode: formData.postalCode || "",
        country: formData.country.label || "",
        cartItems: products,
        totalPrice: totalPrice.toFixed(2),
      };

      emailjs
        .send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_SELLER_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAIL_PUBLIC_KEY
        )
        .then((response) => {
          console.log(
            "Email sent to seller successfully!",
            response.status,
            response.text
          );
        })
        .catch((err) => {
          console.error("Failed to send email to seller:", err);
        });
    };
    loadPayPalScript();

    // Clean up function
    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
      initialized.current = false;
    };
  }, [totalPrice, disabled]);

  return <div ref={paypalRef} id="paypal-button-container"></div>;
};

export default PayPalButton;
