document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const mainButton = document.getElementById('mainButton');
    const mainPoem = document.getElementById('mainPoem');
    const nameElement = document.getElementById('nameEffect');
    const gridItems = document.querySelectorAll('.grid-item');
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');
    const bgMusic = document.getElementById('bgMusic');
    
    // Estado
    let musicPlaying = false;
    
    // Inicialização
    bgMusic.volume = 0.3;
    
    // Botão principal
    // Botão principal
mainButton.addEventListener('click', function() {
    clickSound.play();
    
    if (!musicPlaying) {
        bgMusic.play();
        musicPlaying = true;
    }
    
    // Alternar a classe 'show' no poema principal
    mainPoem.classList.toggle('show');
    
    // Alterar o texto do botão
    if (mainPoem.classList.contains('show')) {
        createConfetti(200);
        this.querySelector('.button-text').textContent = 'FECHAR POEMA';
        
        // Garantir que o poema esteja visível
        mainPoem.style.display = 'block';
        setTimeout(() => {
            mainPoem.style.opacity = '1';
            mainPoem.style.transform = 'scale(1)';
        }, 10);
    } else {
        this.querySelector('.button-text').textContent = 'CLIQUE PARA SURPRESA';
        
        // Animação de fechamento
        mainPoem.style.opacity = '0';
        mainPoem.style.transform = 'scale(0.9)';
        setTimeout(() => {
            mainPoem.style.display = 'none';
        }, 300);
    }
});
    
    // Efeito no nome
    nameElement.addEventListener('click', function() {
        clickSound.play();
        this.classList.toggle('glow-max');
        setTimeout(() => this.classList.toggle('glow-max'), 2000);
        createConfetti(100, ['#FFD700', '#FFFFFF']);
    });
    
    // Grid interativo
    gridItems.forEach((item, index) => {
        // Criar elemento de resposta
        const responseBox = document.createElement('div');
        responseBox.className = 'response-box';
        
        // Conteúdos específicos para cada caixa
        const poems = [
            `<h3>Mestre Ultrakill</h3>
             <div class="poem">
                 <p>Frame perfeito, precisão absoluta</p>
                 <p>Como no jogo, sua vida é disputada</p>
                 <p>Cada movimento calculado</p>
                 <p>Nenhum desafio é deixado de lado</p>
             </div>
             <div class="pixel-art">🎮</div>`,
             
            `<h3>Criador Invencível</h3>
             <div class="poem">
                 <p>Ideias que rompem barreiras</p>
                 <p>Criatividade sem fronteiras</p>
                 <p>O impossível você desfaz</p>
                 <p>Inventando novos caminhos e paz</p>
             </div>
             <div class="emoji-effect">💡✨</div>`,
             
            `<h3>Estilo Darkrai</h3>
             <div class="poem">
                 <p>Mistério em cada detalhe</p>
                 <p>Elegância que nunca falha</p>
                 <p>Seu estilo é único e raro</p>
                 <p>Como Darkrai, lendário e claro</p>
             </div>
             <div class="emoji-effect">👁️‍🗨️🖤</div>`,
             
            `<h3>Design Visionário</h3>
             <div class="poem">
                 <p>Onde outros veem o vazio</p>
                 <p>Você enxerga um mundo frio</p>
                 <p>Transforma o simples em arte</p>
                 <p>Com visão que nos parte</p>
             </div>
             <div class="pixel-art">🎨</div>`
        ];
        
        responseBox.innerHTML = `
            <div class="response-content">
                ${poems[index]}
                <button class="close-btn">✕</button>
            </div>
        `;
        
        item.appendChild(responseBox);
        
        // Interações
        item.addEventListener('mouseenter', function() {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
        
        item.addEventListener('click', function(e) {
            if (e.target.classList.contains('close-btn')) return;
            
            clickSound.play();
            
            // Esconder outras caixas abertas
            document.querySelectorAll('.response-box').forEach(box => {
                box.classList.remove('show');
            });
            
            // Mostrar esta caixa
            responseBox.classList.add('show');
            
            // Efeito visual
            this.style.transform = 'translateY(-10px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 300);
            
            // Confetti específico para cada caixa
            const confettiColors = [
                ['#FF2D75', '#8E24AA'], // Cores Ultrakill
                ['#00F0FF', '#00B4D8'], // Cores Invencible
                ['#000000', '#4B0082'], // Cores Darkrai
                ['#FFD700', '#FFA500']  // Cores Design
            ];
            createConfetti(50, confettiColors[index]);
        });
        
        // Botão de fechar
        responseBox.querySelector('.close-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            responseBox.classList.remove('show');
        });
    });
    
    // Função de confetti
    function createConfetti(count = 100, colors = ['#FF2D75', '#00F0FF', '#FFD700', '#8E24AA', '#00B4D8']) {
        // Remover confetti antigo
        document.querySelectorAll('.confetti-particle').forEach(el => el.remove());
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-particle';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.animationDelay = Math.random() + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
});