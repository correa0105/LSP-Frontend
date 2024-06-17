import React from 'react';
import Lottie from 'lottie-react';
import MainContainer from '../../components/Main';
import { ContainerHome } from './styled';
import lawyerLottie from '../../LottieFiles/LawyerLottie.json';

export default function Home() {
  return (
    <MainContainer>
      <ContainerHome className="row">
        <div className="col-6 d-flex align-items-center">
          <p className="fs-2">
            Nosso sistema é uma solução eficiente para advogados e escritórios de advocacia. Ele permite o cadastro de advogados e a
            gestão de processos jurídicos de forma simples e intuitiva. Com ele, você pode acompanhar todas as etapas do processo,
            desde a abertura até a conclusão, e manter um histórico completo. Invista no futuro do seu escritório com nosso Sistema de
            Gerenciamento Jurídico.
          </p>
        </div>
        <div className="col-6 d-flex align-items-center">
          <Lottie animationData={lawyerLottie} loop />
        </div>
      </ContainerHome>
    </MainContainer>
  );
}
