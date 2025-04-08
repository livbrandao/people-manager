import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProgressSteps({
  currentStep = 1,
  isCurrentStepCompleted = false,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [completedSteps, setCompletedSteps] = useState([]);

  // Definição das etapas
  const steps = [
    { id: 1, label: "Item 1", path: "/" },
    { id: 2, label: "Item 2", path: "/step2" },
    { id: 3, label: "Item 3", path: "/step3" },
    { id: 4, label: "Item 4", path: "/step4" },
    { id: 5, label: "Item 5", path: "/step5" },
    { id: 6, label: "Item 6", path: "/step6" },
    { id: 7, label: "Item 7", path: "/step7" },
    { id: 8, label: "Item 8", path: "/step8" },
    { id: 9, label: "Item 9", path: "/step9" },
  ];

  // Atualiza os passos concluídos quando o passo atual muda
  useEffect(() => {
    // Cria uma lista de passos anteriores ao atual que estão concluídos
    const newCompletedSteps = [];
    for (let i = 1; i < currentStep; i++) {
      newCompletedSteps.push(i);
    }

    // Adiciona o passo atual se estiver marcado como concluído
    if (isCurrentStepCompleted) {
      newCompletedSteps.push(currentStep);
    }

    setCompletedSteps(newCompletedSteps);
  }, [currentStep, isCurrentStepCompleted]);

  // Determina o step status baseado em ativo e concluido
  const determineSteps = () => {
    return steps.map((step) => ({
      ...step,
      status: completedSteps.includes(step.id)
        ? "completed"
        : step.id === currentStep
        ? "active"
        : "pending",
    }));
  };

  const currentSteps = determineSteps();

  const handleStepClick = (stepId, path) => {
    // Permite apenas a navegação para etapas concluídas ou para a etapa ativa atual
    const stepStatus = currentSteps.find((s) => s.id === stepId)?.status;
    if (stepStatus === "completed" || stepStatus === "active") {
      navigate(path);
    }
  };

  return (
    <div className="bg-white rounded-xl w-full mx-auto">
      <div className="flex justify-between items-center">
        {currentSteps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            {/* Conectores entre os ícones */}
            {index > 0 && (
              <div className="relative top-6">
                <div
                  className={`-ml-[88px] lg:w-28 lg:-ml-[140px] border-b-2 border-dashed   ${
                    step.status === "active"
                      ? "border-greyBlue"
                      : step.status === "completed" ||
                        currentSteps[index - 1].status === "completed"
                      ? "border-greyBlue"
                      : "border-mediumLightGray"
                  }`}
                ></div>
              </div>
            )}

            {/* Ícone da etapa */}
            <button
              onClick={() => handleStepClick(step.id, step.path)}
              className={`p-3 rounded-2xl flex items-center justify-center mb-1
                ${
                  step.status === "active"
                    ? "bg-greyBlue text-white border-2 border-black"
                    : step.status === "completed"
                    ? "bg-greyBlue text-white border-2 border-black"
                    : "bg-mediumLightGray text-white"
                }
              `}
            >
              <svg
                width="28"
                height="32"
                viewBox="0 0 28 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.8718 30H25.6575V1.5C25.6575 0.671562 25.0052 0 24.2004 0H3.80039C2.99562 0 2.34325 0.671562 2.34325 1.5V30H1.12896C0.726609 30 0.400391 30.3358 0.400391 30.75V32H27.6004V30.75C27.6004 30.3358 27.2742 30 26.8718 30ZM8.17182 4.75C8.17182 4.33581 8.49804 4 8.90039 4H11.329C11.7313 4 12.0575 4.33581 12.0575 4.75V7.25C12.0575 7.66419 11.7313 8 11.329 8H8.90039C8.49804 8 8.17182 7.66419 8.17182 7.25V4.75ZM8.17182 10.75C8.17182 10.3358 8.49804 10 8.90039 10H11.329C11.7313 10 12.0575 10.3358 12.0575 10.75V13.25C12.0575 13.6642 11.7313 14 11.329 14H8.90039C8.49804 14 8.17182 13.6642 8.17182 13.25V10.75ZM11.329 20H8.90039C8.49804 20 8.17182 19.6642 8.17182 19.25V16.75C8.17182 16.3358 8.49804 16 8.90039 16H11.329C11.7313 16 12.0575 16.3358 12.0575 16.75V19.25C12.0575 19.6642 11.7313 20 11.329 20ZM15.9432 30H12.0575V24.75C12.0575 24.3358 12.3838 24 12.7861 24H15.2147C15.617 24 15.9432 24.3358 15.9432 24.75V30ZM19.829 19.25C19.829 19.6642 19.5027 20 19.1004 20H16.6718C16.2695 20 15.9432 19.6642 15.9432 19.25V16.75C15.9432 16.3358 16.2695 16 16.6718 16H19.1004C19.5027 16 19.829 16.3358 19.829 16.75V19.25ZM19.829 13.25C19.829 13.6642 19.5027 14 19.1004 14H16.6718C16.2695 14 15.9432 13.6642 15.9432 13.25V10.75C15.9432 10.3358 16.2695 10 16.6718 10H19.1004C19.5027 10 19.829 10.3358 19.829 10.75V13.25ZM19.829 7.25C19.829 7.66419 19.5027 8 19.1004 8H16.6718C16.2695 8 15.9432 7.66419 15.9432 7.25V4.75C15.9432 4.33581 16.2695 4 16.6718 4H19.1004C19.5027 4 19.829 4.33581 19.829 4.75V7.25Z"
                  fill="white"
                />
              </svg>
            </button>

            {/* Texto da etapa */}
            <div className="text-center">
              <p
                className={`text-sm font-medium ${
                  step.status === "active"
                    ? "text-greyBlue"
                    : step.status === "completed"
                    ? "text-greyBlue"
                    : "text-mediumLightGray"
                }`}
              >
                {step.label}
              </p>
              {step.status === "completed" && (
                <p className="text-sm">Concluído</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
