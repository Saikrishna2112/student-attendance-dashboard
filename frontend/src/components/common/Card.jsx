const Card = ({ title, children }) => {
  return (
    <div className="bg-white shadow p-5 rounded mb-4">
      {title && <h2 className="text-xl mb-3 font-semibold">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
