import { X } from "lucide-react";

const DeleteMessage = ({ onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-white rounded-xl shadow-darkGray shadow-lg p-6 w-full max-w-md mx-4 text-xl">
        <div className="flex justify-between items-start mb-8">
          <p className="font-bold">Usuário excluído com sucesso!</p>
          <X
            className="h-6 w-6 cursor-pointer text-greyishBlue hover:text-greyishBlue"
            onClick={onCancel}
          />
        </div>

        <p
          className="uppercase text-center font-extrabold text-greyBlue text-lg cursor-pointer hover:text-greyishBlue"
          onClick={onCancel}
        >
          ok
        </p>
      </div>
    </div>
  );
};

export default DeleteMessage;
