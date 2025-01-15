
const CustomStyleSelect = {
    control: (base, state) => ({
        ...base,
        fontWeight: "500",
        width: "130px",
        fontFamily: "var(--satoshi)",
        background: "transparent",
        borderRadius: 7,
        borderColor: "#496653",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          borderColor: "#496653"
        }
      }),
    option: (base, state) => ({
      ...base,
      background: state.isSelected ? "#496653" : state.isFocused ? "#496653" : "#FFF",
      // background: "red",
      color: state.isSelected ? "#FFF" : state.isFocused ? "#FFF" : "#333",
      cursor: "pointer",
      fontFamily: "var(--satoshi)",
      // paddingTop: "0",
      "&:active": {
        background: "#ddd",
      },
    }),
    menu: base => ({
        ...base,
        zIndex: 100,
    })
}

export default CustomStyleSelect