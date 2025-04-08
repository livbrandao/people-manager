import { useState, useEffect } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FuncionarioCard from "./Home/FuncionarioCard";
import ProgressSteps from "./Home/ProgressSteps";
import EmployeeForm from "./Forms/EmployeeForm";
import axios from "axios";

export default function EmployeeListScreen() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [hasAddedEmployee, setHasAddedEmployee] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showMainContent, setShowMainContent] = useState(true);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar funcionários:", error);
      });
  }, []);

  // Ativa o botão se uma das etapas estiver concluída ou se um novo funcionário tiver sido adicionado
  const isNextStepEnabled = isStepCompleted || hasAddedEmployee;

  const handleAddEmployee = () => {
    // abre o formulário e setta true no progresso
    setIsAddingEmployee(true);
    setHasAddedEmployee(true);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    // Oculta o conteúdo principal ao anvançar as etapas
    setShowMainContent(false);
    navigate("/");
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);

      if (newStep === 1) {
        setShowMainContent(true);
        navigate("/");
      } else {
        navigate(`/`);
      }
    }
  };

  const handleToggleStepCompletion = () => {
    setIsStepCompleted(!isStepCompleted);
  };

  const handleBack = () => {
    setIsAddingEmployee(false);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Process Steps */}
      <div className="bg-white p-4 rounded-xl mb-4 shadow">
        <ProgressSteps
          currentStep={currentStep}
          isCurrentStepCompleted={
            currentStep === 1 && (isStepCompleted || hasAddedEmployee)
          }
        />
      </div>

      {showMainContent ? (
        <div className="flex flex-col items-end">
          <div className="flex justify-between gap-4">
            {/* Card de informações */}
            <div className="w-2/4 h-full bg-white p-8 rounded-xl shadow">
              <p className="text-base text-mediumLightGray mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                viverra lectus non porttitor. Suspendisse at lacinia mauris nec
                arcu. Venenatis aliquam turpis. Nulla tellus. Curabitur nec
                massa dolor. Nulla rhoncus pharetra leo dapibus cursus. Praesent
                dignissim nec efficitur dui. Aliquam erat volutpat. Fusce auctor
                venenatis felis at ornare. Suspendisse potenti. Suspendisse
                mattis arcu at elit. Vitae varius magna tincidunt vel. Duis
                rutrum nec commodo nisi. Pharetra ac neque tellus eu vulputate
                rhoncus.
              </p>
              <div className="mt-8">
                <img src="/foto-perfil.png" alt="placeholder" />
              </div>
            </div>

            {/* Card da Lísta de Funcionários */}
            <div className="w-3/4">
              <div className="bg-white rounded-xl shadow">
                {/* Header */}
                <div className="bg-greyBlue text-white p-4 rounded-t-xl flex justify-between items-center">
                  <h2 className="text-2xl font-medium pl-1 flex items-center gap-2">
                    {isAddingEmployee ? (
                      <>
                        <ArrowLeft
                          className="h-6 w-6 cursor-pointer"
                          onClick={handleBack}
                        />
                        Adicionar Funcionário
                      </>
                    ) : (
                      "Funcionário(s)"
                    )}
                  </h2>
                </div>

                {/* div principal */}
                {isAddingEmployee ? (
                  <EmployeeForm onBack={handleBack} />
                ) : (
                  <div>
                    <div className="p-4 flex flex-col justify-between gap-4">
                      <button
                        onClick={handleAddEmployee}
                        className="hover:bg-mediumLightGray py-6 text-base flex items-center w-full text-greyBlue border border-greyBlue rounded-xl justify-center focus:border-2 focus:border-greyBlue focus:outline-none"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Adicionar Funcionário
                      </button>
                      <div className="flex gap-2 items-center justify-between">
                        <div className="flex gap-2">
                          <button className="text-greyBlue hover:bg-mediumLightGray px-8 py-1 text-base flex items-center border border-greyBlue rounded-xl justify-center focus:border-2 focus:border-greyBlue focus:outline-none focus:bg-skyBlue focus:text-white">
                            Ver apenas ativos
                          </button>
                          <button className="text-mediumLightGray hover:bg-darkGreyishBlue px-8 py-1 text-base flex items-center border border-mediumLightGray rounded-xl justify-center">
                            Limpar filtros
                          </button>
                        </div>

                        <span className="text-sm">
                          Ativos:{" "}
                          {
                            employees.filter((emp) => emp.isActive === true)
                              .length
                          }
                          /{employees.length}
                        </span>
                      </div>
                    </div>

                    {/* Lista de funcionarios */}
                    <div className="p-4 max-h-[220px] overflow-y-auto">
                      {employees.map((employee) => (
                        <FuncionarioCard
                          key={employee.id}
                          index={employee.id}
                          nome={employee.name}
                          cpf={employee.cpf}
                          status={employee.isActive ? "Ativo" : "Inativo"}
                          cargo={employee.role}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div
                  className={`p-4 flex justify-end items-center ${
                    isAddingEmployee ? "hidden" : "block"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">A etapa está concluída?</span>

                    <div className="flex items-center">
                      <div
                        className="w-16 h-5 flex items-center rounded-full p-1 cursor-pointer bg-mediumLightGray"
                        onClick={handleToggleStepCompletion}
                      >
                        <span
                          className={`text-xs font-light  tracking-wide text-dark ${
                            isStepCompleted ? "px-2" : "pl-5"
                          }`}
                        >
                          {isStepCompleted ? "Sim" : "Não"}
                        </span>
                        <div
                          className={`w-3 h-3 rounded-full shadow-md transform bg-greyBlue ${
                            isStepCompleted
                              ? "translate-x-1"
                              : "-translate-x-10"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            disabled={!isNextStepEnabled}
            onClick={handleNextStep}
            className={`px-12 py-2 text-white rounded-xl text-sm mt-2 ${
              isNextStepEnabled
                ? "bg-greyBlue hover:bg-blue-700 cursor-pointer"
                : "bg-darkGreyishBlue opacity-50 cursor-not-allowed"
            }`}
          >
            Próximo passo
          </button>
        </div>
      ) : (
        // Conteúdo das outras etapas
        <div className="flex flex-col items-stretch h-screen mt-4 gap-96">
          <div className="ml-[80px] md:ml-[60px] lg:ml-[40px] mr-4 bg-skyBlue text-white text-center py-3 rounded-2xl mt-10 text-xl ">
            Em breve
          </div>

          <div className="flex justify-between gap-2 items-endmt-8">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="px-12 py-2 text-white rounded-xl text-sm mt-8 bg-greyBlue hover:bg-greyishBlue cursor-pointer"
            >
              Passo anterior
            </button>
            <button
              type="button"
              disabled={!isNextStepEnabled}
              onClick={handleNextStep}
              className={`px-12 py-2 text-white rounded-xl text-sm mt-8 ${
                isNextStepEnabled
                  ? "bg-greyBlue hover:bg-greyishBlue cursor-pointer"
                  : "bg-darkGreyishBlue opacity-50 cursor-not-allowed"
              }`}
            >
              Próximo passo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
