// Aguarda o carregamento completo do HTML antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
  // === VARIÁVEIS GLOBAIS ===

  // Pega o elemento que contém todos os cards do carrossel
  const carouselTrack = document.getElementById("carouselTrack");

  // Pega os botões de navegação (anterior e próximo)
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Pega o wrapper que envolve o carrossel (usa para controlar a largura visível)
  const carouselWrapper = document.querySelector(".carousel-wrapper");

  // Largura de cada card em pixels
  const cardWidth = 230;

  // Espaço entre os cards (gap)
  const gap = 25;

  // Converte os cards em array e pega o total de cards
  const cards = Array.from(carouselTrack.children);
  const totalCards = cards.length;

  // Número de cards visíveis na tela (começa com no máximo 5 ou o total, o que for menor)
  let visibleCards = Math.min(1, totalCards);

  // Índice atual do carrossel (qual card está sendo mostrado primeiro)
  let currentIndex = 0;

  // === FUNÇÕES ===

  // Atualiza a posição do carrossel movendo-o para a esquerda
  // Multiplica o índice atual pela largura de cada card + gap para calcular o deslocamento
  function updateCarousel() {
    const offset = -currentIndex * (cardWidth + gap);
    carouselTrack.style.transform = `translateX(${offset}px)`;
  }

  // Ajusta a largura do wrapper baseado no número de cards visíveis
  // Isso garante que apenas a quantidade correta de cards seja mostrada
  function updateWrapperWidth() {
    const trackWidth = (cardWidth + gap) * visibleCards - gap;
    carouselWrapper.style.width = `${trackWidth}px`;
  }

  // Ajusta o carrossel conforme o tamanho da tela (responsividade)
  function handleResize() {
    if (window.innerWidth <= 800) {
      // Telas pequenas (mobiles): mostra 2 cards
      visibleCards = 2;
    } else if (window.innerWidth <= 1340) {
      // Telas médias (tablets/notebooks): mostra 4 cards
      visibleCards = 4;
    } else {
      // Telas grandes (desktop): mostra até 5 cards
      visibleCards = Math.min(6, totalCards);
    }

    // Se o índice atual é maior que deveria, corrige para não ficar fora dos limites
    if (currentIndex > totalCards - visibleCards) {
      currentIndex = totalCards - visibleCards;
    }

    // Aplica as mudanças
    updateWrapperWidth();
    updateCarousel();
  }

  // === EVENTOS DE CLIQUE ===

  // Botão "Anterior" (←)
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      // Se não estiver no início, volta um card
      currentIndex--;
    } else {
      // Se estiver no início, vai para o final (loop infinito)
      currentIndex = totalCards - visibleCards;
    }
    updateCarousel();
  });

  // Botão "Próximo" (→)
  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalCards - visibleCards) {
      // Se não estiver no final, avança um card
      currentIndex++;
    } else {
      // Se estiver no final, volta para o início (loop infinito)
      currentIndex = 0;
    }
    updateCarousel();
  });

  // === INICIALIZAÇÃO ===

  // Chama a função na primeira vez para configurar tudo
  handleResize();

  // Escuta mudanças no tamanho da janela e ajusta automaticamente
  window.addEventListener("resize", handleResize);
});
