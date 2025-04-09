import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

import FuncionarioCard from "./Home/FuncionarioCard";
import ProgressSteps from "./Home/ProgressSteps";
import EmployeeForm from "./Forms/EmployeeForm";
import DeleteMessage from "./alerts/DeleteMessage";

import { fetchEmployees, setEmployees } from "../redux/employeesSlice";
import {
  goToNextStep,
  goToPreviousStep,
  markStepCompleted,
} from "../redux/stepsSlice";

export default function EmployeeListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector((state) => state.employees.list);
  const currentStep = useSelector((state) => state.steps.currentStep);
  const completedSteps = useSelector((state) => state.steps.completedSteps);

  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [hasAddedEmployee, setHasAddedEmployee] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [filterActiveOnly, setFilterActiveOnly] = useState(false);

  // Define total steps
  const TOTAL_STEPS = 9;
  const isLastStep = currentStep === TOTAL_STEPS;

  // Ativa o botão se uma das etapas estiver concluída ou se um novo funcionário tiver sido adicionado
  const isNextStepEnabled = isStepCompleted || hasAddedEmployee;

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddEmployee = () => {
    // abre o formulário e setta true no progresso
    setIsAddingEmployee(true);
    setHasAddedEmployee(true);
    // Não marca como "Concluído" ainda, apenas habilitamos o botão "Próximo passo"
  };

  const handleNextStep = () => {
    dispatch(goToNextStep());
    dispatch(markStepCompleted(currentStep));
    // Oculta o conteúdo principal ao avançar as etapas
    setShowMainContent(false);
    navigate(`/step${currentStep + 1}`);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;

      dispatch(goToPreviousStep());

      if (newStep === 1) {
        setShowMainContent(true);
        navigate("/");
      } else {
        setShowMainContent(false);
        navigate(`/step${newStep}`);
      }
    }
  };

  const handleToggleStepCompletion = () => {
    const newCompletion = !isStepCompleted;
    setIsStepCompleted(newCompletion);

    // Marca como concluído e mostra o indicador visual
    if (newCompletion) {
      dispatch(markStepCompleted(currentStep));
    }
  };

  const handleBack = () => {
    setIsAddingEmployee(false);
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setIsAddingEmployee(true);
    setHasAddedEmployee(true);
    // Não marca como "Concluído" ainda, apenas habilita o botão "Próximo passo"
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este funcionário?"
    );
    if (confirmDelete) {
      const updated = employees.filter((emp) => emp.id !== id);
      dispatch(setEmployees(updated));
      setShowDeleteMessage(true);
    }
  };

  const filteredEmployees = filterActiveOnly
    ? employees.filter((emp) => emp.isActive)
    : employees;

  return (
    <div className="min-h-screen p-4">
      {/* Process Steps */}
      <div className="bg-white p-4 rounded-xl mb-4 shadow">
        <ProgressSteps
          currentStep={currentStep}
          isCurrentStepCompleted={
            isStepCompleted || completedSteps.includes(currentStep)
          }
          showCompletedIndicator={true}
          totalSteps={TOTAL_STEPS}
        />
      </div>

      {currentStep === 1 && showMainContent ? (
        <div className="flex flex-col items-end">
          {showDeleteMessage && (
            <DeleteMessage
              onConfirm={handleDelete}
              onCancel={() => setShowDeleteMessage(false)}
            />
          )}

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
                  <EmployeeForm
                    onBack={handleBack}
                    employeeToEdit={employeeToEdit}
                    setIsAddingEmployee={setIsAddingEmployee}
                    setEmployees={setEmployees}
                  />
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
                          <button
                            onClick={() => setFilterActiveOnly(true)}
                            className="text-greyBlue hover:bg-mediumLightGray px-8 py-1 text-base flex items-center border border-greyBlue rounded-xl justify-center focus:border-2 focus:border-greyBlue focus:outline-none focus:bg-skyBlue focus:text-white"
                          >
                            Ver apenas ativos
                          </button>
                          <button
                            onClick={() => setFilterActiveOnly(false)}
                            className="text-mediumLightGray hover:bg-darkGreyishBlue px-8 py-1 text-base flex items-center border border-mediumLightGray rounded-xl justify-center"
                          >
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
                      {filteredEmployees.map((employee) => (
                        <FuncionarioCard
                          key={employee.id}
                          employee={employee}
                          index={employee.id}
                          nome={employee.name}
                          cpf={employee.cpf}
                          status={employee.isActive ? "Ativo" : "Inativo"}
                          cargo={employee.role}
                          onEdit={() => handleEdit(employee)}
                          onDelete={() => handleDelete(employee.id)}
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
                          className={`text-xs font-light tracking-wide text-dark ${
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

          {!isLastStep && (
            <button
              type="button"
              disabled={!isNextStepEnabled}
              onClick={handleNextStep}
              className={`px-12 py-2 text-white rounded-xl text-sm mt-2 ${
                isNextStepEnabled
                  ? "bg-greyBlue hover:bg-greyishBlue cursor-pointer"
                  : "bg-darkGreyishBlue opacity-50 cursor-not-allowed"
              }`}
            >
              Próximo passo
            </button>
          )}
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

            {!isLastStep && (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
