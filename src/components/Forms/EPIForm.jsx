import React, { useState } from "react";

const EPIForm = ({ equipamentos = [], setEquipamentos }) => {
  const [novoTipo, setNovoTipo] = useState("");
  const [novoCA, setNovoCA] = useState("");

  const adicionarEquipamento = (index) => {
    if (index === undefined) {
      // Adicionar novo item
      if (novoTipo) {
        const novosEquipamentos = [
          ...equipamentos,
          { tipo: novoTipo, ca: novoCA },
        ];
        setEquipamentos(novosEquipamentos);
      }
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

  const handleEPIChange = (index, field, value) => {
    const novosEquipamentos = [...equipamentos];
    novosEquipamentos[index] = {
      ...novosEquipamentos[index],
      [field]: value,
    };
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
              <label className="block text-base font-medium mb-1">
                Selecione o EPI:
              </label>
              <select
                className="w-full border border-greyBlue rounded-xl px-2 py-1.5 text-base"
                value={equipamento.tipo}
                onChange={(e) => handleEPIChange(index, "tipo", e.target.value)}
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
              <label className="block text-base font-medium mb-1">
                Informe o número do CA:
              </label>
              <input
                type="text"
                className="w-full border border-greyBlue rounded-xl px-2 py-1.5 text-sm"
                value={equipamento.ca}
                onChange={(e) => handleEPIChange(index, "ca", e.target.value)}
                placeholder="9356"
              />
            </div>

            <div className="flex items-end">
              <button
                className="w-full border border-greyBlue rounded-xl px-2 py-1.5 text-blue-500 text-base hover:bg-skyBlue hover:text-white transition"
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
            <label className="block text-base font-medium mb-1">
              Selecione o EPI:
            </label>
            <select
              className="w-full border border-greyBlue rounded-xl px-2 py-1.5 text-base"
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
            <label className="block text-sm font-medium mb-1">
              Informe o número do CA:
            </label>
            <input
              type="text"
              className="w-full border border-greyBlue rounded-xl px-2 py-1.5 text-base"
              value={novoCA}
              onChange={(e) => setNovoCA(e.target.value)}
              placeholder="9356"
            />
          </div>

          <div className="flex items-end">
            <button
              className="w-full border border-greyBlue rounded-xl px-2 py-1.5 text-greyBlue text-sm hover:bg-skyBlue hover:text-white transition"
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
