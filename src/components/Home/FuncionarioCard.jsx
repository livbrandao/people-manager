import React from "react";
import { useState, useRef, useEffect } from "react";

const FuncionarioCard = ({
  nome,
  cpf,
  status,
  cargo,
  index,
  onEdit,
  onDelete,
}) => {
  const isEven = index % 2 === 0;

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  // Fecha o popup quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleOptionClick = (action) => {
    setShowPopup(false);
    if (action === "alterar") {
      onEdit();
    } else if (action === "excluir") {
      onDelete();
    }
  };

  return (
    <div
      className={`flex justify-between items-center  pl-4 rounded-xl mb-4 bg-opacity-40 ${
        isEven ? "bg-greyBlue" : "bg-mediumLightGray"
      }`}
    >
      <div className="py-4">
        <p className="text-darkGray text-2xl">{nome}</p>
        <div className="flex gap-2 mt-1 flex-wrap">
          <span className="text-sm bg-greyBlue text-white px-3 py-0.5 rounded-full">
            {cpf}
          </span>
          <span className="text-sm bg-greyBlue text-white px-3 py-0.5 rounded-full">
            {status}
          </span>
          <span className="text-sm bg-greyBlue text-white px-3 py-0.5 rounded-full">
            {cargo}
          </span>
        </div>
      </div>
      <div className="relative">
        <button
          ref={buttonRef}
          className="bg-greyBlue hover:bg-greyishBlue text-white px-3 py-8 rounded-r-md text-xl font-bold"
          onClick={togglePopup}
        >
          ...
        </button>

        {showPopup && (
          <div
            ref={popupRef}
            className="absolute right-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-50 w-28 -top-1"
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              borderRadius: "8px",
            }}
          >
            <div className="divide-y divide-mediumLightGray">
              <button
                onClick={() => handleOptionClick("alterar")}
                className="block w-full px-4 py-3 text-mediumLightGray text-center hover:bg-gray-50"
              >
                Alterar
              </button>
              <button
                onClick={() => handleOptionClick("excluir")}
                className="block w-full px-4 py-3 text-mediumLightGray text-center hover:bg-gray-50"
              >
                Excluir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuncionarioCard;
