/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";


// Soft UI Dashboard React contexts

import SoftTextAreaWithIconRoot from "./SoftTextAreaWithIconRoot";
import SoftTextAreaIconBoxRoot from "./SoftTextAreaIconBoxRoot";
import SoftTextAreaRoot from "./SoftTextAreaRoot";
import SoftTextAreaIconRoot from "./SoftTextAreaIconRoot";
import { useSoftUIController } from "context";

const SoftTextArea = forwardRef(({ size, icon, error, success, disabled, ...rest }, ref) => {
  let template;
  const [controller] = useSoftUIController();
  const { direction } = controller;
  const iconDirection = icon.direction;

  if (icon.component && icon.direction === "left") {
    template = (
      <SoftTextAreaWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <SoftTextAreaIconBoxRoot ownerState={{ size }}>
          <SoftTextAreaIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SoftTextAreaIconRoot>
        </SoftTextAreaIconBoxRoot>
        <SoftTextAreaRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        />
      </SoftTextAreaWithIconRoot>
    );
  } else if (icon.component && icon.direction === "right") {
    template = (
      <SoftTextAreaWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <SoftTextAreaRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        />
        <SoftTextAreaIconBoxRoot ownerState={{ size }}>
          <SoftTextAreaIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SoftTextAreaIconRoot>
        </SoftTextAreaIconBoxRoot>
      </SoftTextAreaWithIconRoot>
    );
  } else {
    template = (
      <SoftTextAreaRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled }} />
    );
  }

  return template;
});

// Setting default values for the props of SoftTextArea
SoftTextArea.defaultProps = {
  size: "medium",
  icon: {
    component: false,
    direction: "none",
  },
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the SoftTextArea
SoftTextArea.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SoftTextArea;
