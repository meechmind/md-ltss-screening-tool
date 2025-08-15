// Container component

export default function Container({ children, as: Tag = "div", className = "" }) {
  return (
    <Tag className={`mda-container ${className}`.trim()}>
      {children}
    </Tag>
  );
}