const { createApp } = Vue;

createApp({
  data() {
    return {
      menuAberto: false,

      produtos: [
        {
          id: 1,
          nome: "Camiseta Oversized Black",
          preco: 79.90,
          img: "img/camiseta1.jpg"
        },
        {
          id: 2,
          nome: "Calça Skinny Black",
          preco: 129.90,
          img: "img/calca1.jpg"
        },
        {
          id: 3,
          nome: "Jaqueta Streetwear Premium",
          preco: 199.90,
          img: "img/jaqueta1.jpg"
        },
        {
          id: 4,
          nome: "Moletom Hoodie Black",
          preco: 149.90,
          img: "img/moletom1.jpg"
        },
        {
          id: 5,
          nome: "Shorts Cargo Black",
          preco: 89.90,
          img: "img/shorts1.jpg"
        },
        {
          id: 6,
          nome: "Vestido Minimalista Dark",
          preco: 159.90,
          img: "img/vestido1.jpg"
        }
      ],

      carrinho: []
    };
  },

  computed: {
    totalCarrinho() {
      return this.carrinho.reduce((t, p) => t + p.preco, 0).toFixed(2);
    }
  },

  mounted() {
    // Fecha o menu com ESC
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.menuAberto) {
        this.fecharMenu();
      }
    });
  },

  methods: {
    abrirMenu() {
      this.menuAberto = true;

      // Foco automático quando o menu abrir
      this.$nextTick(() => {
        if (this.$refs.btnFecharMenu) {
          this.$refs.btnFecharMenu.focus();
        }
      });
    },

    fecharMenu() {
      this.menuAberto = false;
    },

    adicionarCarrinho(produto) {
      this.carrinho.push(produto);
    },

    removerCarrinho(indice) {
      this.carrinho.splice(indice, 1);
    }
  }
}).mount("#app");
