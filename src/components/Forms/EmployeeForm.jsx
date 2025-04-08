import React, { useState, useEffect } from "react";
import EPIForm from "./EPIForm";
import axios from "axios";
import SuccessMessage from "../alerts/SuccessMessage";

const EmployeeForm = ({
  onBack,
  employeeToEdit,
  setIsAddingEmployee,
  setEmployees,
}) => {
  const [formData, setFormData] = useState({
    isActive: true,
    name: "",
    gender: "",
    cpf: "",
    birthDate: "",
    rg: "",
    role: "",
    doesNotUseEPI: false,
    activities: [
      {
        activity: "",
        epis: [],
      },
    ],
    healthCertificate: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleActivityChange = (index, value) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[index].activity = value;

    setFormData((prev) => ({
      ...prev,
      activities: updatedActivities,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[`activity-${index}`]) {
        delete newErrors[`activity-${index}`];
      }
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Nome é obrigatório";
    if (!formData.gender) newErrors.gender = "Gênero é obrigatório";
    if (!formData.cpf) newErrors.cpf = "CPF é obrigatório";
    if (!formData.birthDate)
      newErrors.birthDate = "Data de nascimento é obrigatória";
    if (!formData.rg) newErrors.rg = "RG é obrigatório";
    if (!formData.role) newErrors.role = "Função é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Formulário inválido!");
      return;
    }

    try {
      setLoading(true);
      setSuccessMessage("");

      if (employeeToEdit) {
        const response = await axios.put(
          `http://localhost:3001/employees/${employeeToEdit.id}`,
          formData
        );

        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === employeeToEdit.id ? response.data : emp
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:3001/employees",
          formData
        );
        setEmployees((prev) => [...prev, response.data]);
      }

      setSuccessMessage("Trabalhador cadastrado com sucesso!");

      // Limpa os dados do formulário
      setFormData({
        isActive: true,
        name: "",
        gender: "",
        cpf: "",
        birthDate: "",
        rg: "",
        role: "",
        doesNotUseEPI: false,
        activities: [{ activity: "", epis: [] }],
        healthCertificate: "",
      });

      // Fecha o formulário
      setIsAddingEmployee(false);
      onBack();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEPIChange = (index, epis) => {
    const updatedActivities = [...formData.activities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      epis: epis,
    };

    setFormData({
      ...formData,
      activities: updatedActivities,
    });
  };

  const addActivity = () => {
    setFormData({
      ...formData,
      activities: [...formData.activities, { activity: "", epis: [] }],
    });
  };

  // Preenche o formulário com os dados do funcionário a ser editado
  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          uploadedFile: {
            name: file.name,
            data: reader.result, // Base64
          },
        }));
      };
      reader.readAsDataURL(file); // Converte para Base64
    }
  };

  return (
    <div className="px-6 py-8">
      {successMessage && <SuccessMessage message={successMessage} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Status */}
        <div className="mb-4 p-2 border border-greyBlue rounded-xl flex justify-between items-center shadow">
          <label className="text-base text-dark font-medium">
            O trabalhador está ativo ou inativo?
          </label>
          <div className="flex items-center">
            <div
              className="w-20 h-5 flex items-center rounded-full p-1 cursor-pointer bg-mediumLightGray"
              onClick={() =>
                setFormData({ ...formData, isActive: !formData.isActive })
              }
            >
              <span
                className={`text-xs font-light pl-5 tracking-wide text-dark`}
              >
                {formData.isActive ? "Ativo" : "Inativo"}
              </span>
              <div
                className={`w-3 h-3 rounded-full shadow-md transform bg-greyBlue ${
                  formData.isActive ? "translate-x-2" : "-translate-x-14"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mb-4 border border-greyBlue shadow rounded-xl p-3">
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-medium text-base">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-greyBlue text-base rounded-xl"
                placeholder="Nome"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col items-start justify-evenly">
              <label className="block text-sm mb-1">Sexo</label>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <input
                    type="radio"
                    id="feminino"
                    name="gender"
                    value="feminino"
                    checked={formData.gender === "feminino"}
                    onChange={handleInputChange}
                    className="peer hidden"
                  />
                  <label
                    htmlFor="feminino"
                    className="cursor-pointer p-2 mr-2 border rounded-full text-sm
               border-greyBlue  peer-checked:bg-greyBlue
               transition-colors duration-200"
                  ></label>

                  <span className="text-base text-dark">Feminino</span>
                </div>

                <input
                  type="radio"
                  id="masculino"
                  name="gender"
                  value="masculino"
                  checked={formData.gender === "masculino"}
                  onChange={handleInputChange}
                  className="peer hidden"
                />
                <label
                  htmlFor="masculino"
                  className="cursor-pointer p-2 mr-2 border rounded-full text-sm
               border-greyBlue  peer-checked:bg-greyBlue
               transition-colors duration-200"
                ></label>

                <span className="text-base text-dark">Masculino</span>
              </div>
              {errors.gender && (
                <span className="text-red-500">{errors.gender}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-base mb-1">CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                className="w-full p-2 border border-greyBlue rounded-xl text-base"
                placeholder="CPF"
              />
              {errors.cpf && <span className="text-red-500">{errors.cpf}</span>}
            </div>
            <div>
              <label className="block font-medium text-base mb-1">
                Data de Nascimento
              </label>
              <input
                type="text"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-greyBlue rounded-xl text-sm"
                placeholder="DD/MM/AAAA"
              />
              {errors.birthDate && (
                <span className="text-red-500">{errors.birthDate}</span>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">RG</label>
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleInputChange}
                className="w-full p-2 border border-greyBlue rounded-xl text-base"
                placeholder="RG"
              />
              {errors.rg && <span className="text-red-500">{errors.rg}</span>}
            </div>
            <div>
              <label className="block font-medium text-base mb-1">Cargo</label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-greyBlue rounded-xl text-base"
                >
                  <option value="">Selecione um cargo</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Assistente">Assistente</option>
                  <option value="Operador">Operador</option>
                </select>
                {errors.role && (
                  <span className="text-red-500">{errors.role}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* EPI Section */}
        <div className="mb-4 border border-greyBlue shadow rounded-xl p-3">
          <h3 className="text-base font-medium mb-2">
            Quais EPIs o trabalhador usa na atividade?
          </h3>

          <div className="mb-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="doesNotUseEPI"
                checked={formData.doesNotUseEPI}
                onChange={handleInputChange}
                className="mr-2 border border-greyBlue"
              />
              <span className="text-base">O trabalhador não usa EPI.</span>
            </label>
          </div>

          {!formData.doesNotUseEPI && (
            <>
              {formData.activities.map((activity, index) => (
                <div
                  key={index}
                  className="mb-3 border border-greyBlue shadow rounded-xl p-2"
                >
                  <div className="mb-2">
                    <label className="block text-base font-medium mb-1">
                      Selecione a atividade:
                    </label>
                    <div className="relative">
                      <select
                        value={activity.activity}
                        onChange={(e) =>
                          handleActivityChange(index, e.target.value)
                        }
                        className="w-full p-2 border border-greyBlue rounded-xl text-base appearance-none mb-2"
                      >
                        <option value="">Atividade 1</option>
                        <option value="atividade2">Atividade 2</option>
                        <option value="atividade3">Atividade 3</option>
                      </select>

                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Integrated EPIForm */}
                  <EPIForm
                    equipamentos={activity.epis || []}
                    setEquipamentos={(epis) => handleEPIChange(index, epis)}
                  />

                  <button
                    type="button"
                    className="w-full py-2 text-greyBlue border border-greyBlue rounded-xl text-sm mb-3 hover:bg-skyBlue hover:text-white transition"
                    onClick={addActivity}
                  >
                    Adicionar outra atividade
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Health Certificate Section */}
        <div className="my-4 border border-greyBlue shadow rounded-xl p-3">
          <h3 className="text-base font-medium mb-2">
            Adicione Atestado de Saúde (opcional):
          </h3>
          <div className="mb-2 p-2 border border-greyBlue rounded-xl flex justify-between items-center">
            <input
              type="text"
              value={formData.uploadedFile?.name || ""}
              placeholder="Nenhum arquivo selecionado"
              readOnly
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-skyBlue file:text-white hover:file:bg-skyBlue/80"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {/* Input invisível de arquivo */}
            <input
              type="file"
              id="fileInput"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <label
            htmlFor="fileInput"
            className="cursor-pointer text-center w-full block px-4 py-2 text-sm text-skyBlue border border-skyBlue rounded-xl hover:bg-skyBlue hover:text-white transition"
          >
            Selecionar arquivo
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-greyBlue border border-greyBlue rounded-xl text-sm hover:bg-skyBlue hover:text-white transition"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default EmployeeForm;
