import React, { useState } from "react";

const EPIForm = () => {
  const [equipamentos, setEquipamentos] = useState([
    { tipo: "Calçado de segurança", ca: "9356" },
    { tipo: "Calçado de segurança", ca: "9356" },
    { tipo: "Capacete", ca: "9357" },
  ]);

  const [novoTipo, setNovoTipo] = useState("");
  const [novoCA, setNovoCA] = useState("");

  const adicionarEquipamento = (index) => {
    if (index === undefined) {
      // Adicionar novo item
      const novosEquipamentos = [
        ...equipamentos,
        { tipo: novoTipo, ca: novoCA },
      ];
      setEquipamentos(novosEquipamentos);
    } else {
      // Atualizar item existente
      const novosEquipamentos = [...equipamentos];
      novosEquipamentos[index] = {
        ...novosEquipamentos[index],
        tipo: novoTipo,
        ca: novoCA,
      };
      setEquipamentos(novosEquipamentos);
    }
    setNovoTipo("");
    setNovoCA("");
  };

  const excluirEquipamento = (index) => {
    const novosEquipamentos = equipamentos.filter((_, i) => i !== index);
    setEquipamentos(novosEquipamentos);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {equipamentos.map((equipamento, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
          >
            <div>
              <label className="block text-base font-medium text-dark mb-1">
                Selecione o EPI:
              </label>
              <select
                className="w-full border border-greyBlue rounded-lg px-2 py-1.5  focus:border-sea-greyBlue text-dark font-normal"
                value={equipamento.tipo}
                onChange={(e) => {
                  const novosEquipamentos = [...equipamentos];
                  novosEquipamentos[index].tipo = e.target.value;
                  setEquipamentos(novosEquipamentos);
                }}
              >
                <option value="Calçado de segurança">
                  Calçado de segurança
                </option>
                <option value="Capacete">Capacete</option>
                <option value="Luvas">Luvas</option>
                <option value="Óculos">Óculos</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-medium text-dark mb-1">
                Informe o número do CA:
              </label>
              <input
                type="text"
                className="w-full border border-greyBlue rounded-lg px-2 py-1.5  focus:border-sea-greyBlue text-dark font-normal"
                value={equipamento.ca}
                onChange={(e) => {
                  const novosEquipamentos = [...equipamentos];
                  novosEquipamentos[index].ca = e.target.value;
                  setEquipamentos(novosEquipamentos);
                }}
              />
            </div>

            <div className="flex items-end">
              <button
                className="w-full border border-greyBlue rounded-lg px-2 py-1.5  focus:border-sea-greyBlue text-greyBlue"
                onClick={() => excluirEquipamento(index)}
              >
                Excluir EPI
              </button>
            </div>
          </div>
        ))}

        {/* Linha para adicionar novo EPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-base font-medium text-dark mb-1">
              Selecione o EPI:
            </label>
            <select
              className="w-full border border-greyBlue rounded-lg px-2 py-1.5  focus:border-sea-greyBlue text-dark font-normal"
              value={novoTipo}
              onChange={(e) => setNovoTipo(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Calçado de segurança">Calçado de segurança</option>
              <option value="Capacete">Capacete</option>
              <option value="Luvas">Luvas</option>
              <option value="Óculos">Óculos</option>
            </select>
          </div>

          <div>
            <label className="block text-base font-medium text-dark mb-1">
              Informe o número do CA:
            </label>
            <input
              type="text"
              className="w-full border border-greyBlue rounded-lg px-2 py-1.5  focus:border-sea-greyBlue text-dark font-normal"
              value={novoCA}
              onChange={(e) => setNovoCA(e.target.value)}
            />
          </div>

          <div className="flex items-end">
            <button
              className="w-full border border-greyBlue rounded-lg px-2 py-1.5  focus:border-sea-greyBlue text-greyBlue"
              onClick={() => adicionarEquipamento()}
            >
              Adicionar EPI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EPIForm;
