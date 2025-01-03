import React, { useState, useEffect } from "react";
const AuthLayout = ({ mainContent }) => {

  return (
    <>
      <section id="content">
        <main>{mainContent}</main>
      </section>
    </>
  );
};

export default AuthLayout;
