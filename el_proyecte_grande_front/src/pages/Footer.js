import React from 'react'

export default function Footer() {
const year = new Date().getFullYear();
return (
    <footer
        style={{
            zIndex:"99",
            position: "fixed",
            backgroundColor: " #795548",
            opacity:"0.6",
            bottom: "0",
            left: "0",
            right: "0",
            padding: ":8px",
            textAlign: "center",
        }}
    >
        {" "}
        {`Copyright © Upbeat Code ${year}`}
    </footer>
);
};
