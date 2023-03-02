import prompt from "prompt-sync";

class Sistema{

    static menu(){

        var teclado = prompt();
        let opcao:number= 10;

        while(opcao!=0){
            console.log("1 - Criar consultor");
            console.log("2 - Remover consultor");
            console.log("3 - Criar gerente");
            console.log("4 - Remover gerente");
            console.log("5 - Criar projeto");
            console.log("6 - Remover projeto");
            console.log("7 - Listar Gerentes/Consultores/Projetos");
            console.log("8 - Logar");
            console.log("0 - Sair");
            
            opcao = +teclado("Escolha uma opcao: ");

            let nome: string;
            let senha: string;
            let nome_gerente: string
            let nomes_consultores: string[]
            let etapas: string[]
            let gerente: Gerente
            let consultores: Consultor[]
            let resposta: number
            let projeto: Projeto

            switch (opcao) {
                case 1:

                    nome = teclado("Digite um nome: ");
                    senha = teclado("Digite uma senha: ");
                    Usuario.criarConsultor(nome,senha);
                    break;
                
                case 2:

                    nome = teclado("Digite o nome do Consultor: ");
                    Usuario.removerConsultor(nome);
                    break;
                
                case 3:

                    nome = teclado("Digite um nome: ");
                    senha = teclado("Digite uma senha: ");
                    Usuario.criarGerente(nome,senha);
                    break;
                
                case 4:

                    nome = teclado("Digite o nome do Gerente: ");
                    Usuario.removerGerente(nome);
                    break;
                

                case 5:

                    nome = teclado("Digite um nome: ");
                    nome_gerente = teclado("Digite o nome do gerente: ");
                    nomes_consultores = teclado("Digite os nomes dos consultores separados por virgula: ").split(",");
                    etapas = teclado("Digite as etapas separadas por virgula: ").split(",");

                    gerente = Gerente.Gerentes.filter(g => g.nome == nome_gerente)[0];
                    consultores= Consultor.Consultores.filter((consultor) => nomes_consultores.includes(consultor.nome))
                    
                    Projeto.criarProjeto(nome,gerente,consultores,etapas);
                    break;

                case 6:

                    nome = teclado("Digite o nome do projeto: ");
                    projeto = Projeto.projetos.filter(p => p.nome == nome)[0];
                    Projeto.removerProjeto(projeto);
                    break;
                
                case 7:

                    resposta = +teclado("Deseja mostrar os 1.Consultores, 2.Gerentes, 3.Projetos")
                    switch (resposta) {
                        case 1:
                            console.log(Usuario.verConsultores())
                            break;
                        
                        case 2:
                            console.log(Usuario.verGerentes())
                            break;

                        case 3:
                            console.log(Projeto.listarProjeto())
                            break;

                        default:
                            break;
                    }
                
                case 8:
                    resposta = +teclado("Deseja logar como: 1.Consultor / 2.Gerente")
                    nome = teclado("Digite seu nome: ")
                    senha = teclado("Digite sua senha: ")
                    switch (resposta) {
                        case 1:
                            Consultor.Consultores.forEach(element => { if(element.nome == nome && element.senha == senha){

                                

                            }   
                            });
                            break;
                        case 2:
                            Gerente.Gerentes.forEach(element => { if(element.nome == nome && element.senha == senha){
                                


                            } 
                            });
                            break;
                        default:
                            break;
                    }

                    break;
                
                case 0: break;

                default:
                    break;
            }
        }

    }

    loginConsultor(Consultor:Consultor){
        
        var teclado = prompt();
        let opcao:number= 10;

        while(opcao!=0){
            console.log("1 - Ver meus dados");
            console.log("2 - Modificar meus dados");
            console.log("3 - Verificar Projetos onde estou alocado");
            console.log("4 - Avançar com um projeto");
            console.log("5 - Pedir retirada de um projeto");
            console.log("0 - Sair");
            
            opcao = +teclado("Escolha uma opcao: ");

            let nome:string
            let senha:string
            switch (opcao) {
                case 1:
                    Consultor.verDados();
                    break;
                
                case 2:
                    nome = teclado("Digite o novo nome: ")
                    senha = teclado("Digite a nova senha: ")
                    Consultor.modificarDados(nome,senha);
                    break;

                case 3:
                    for (let p of Consultor.projetos){
                        console.log(p.nome)
                    };
                    break;

                case 4:
                    
                    break;

                case 5:
                    
                    break;

                case 0: break;
                
                default:
                    break;
            }
        }

    }

    loginGerente(Gerente:Gerente){
        
        var teclado = prompt();
        let opcao:number= 10;

        while(opcao!=0){
            console.log("1 - Ver meus dados");
            console.log("2 - Modificar meus dados");
            console.log("3 - Verificar Projetos onde estou alocado");
            console.log("4 - Avançar com um projeto e entregar");
            console.log("5 - Aprovar retirada de um projeto");
            console.log("6 - Passar projeto para outro gerente");
            console.log("0 - Sair");
            
            opcao = +teclado("Escolha uma opcao: ");

            let nome:string
            let senha:string
            switch (opcao) {
                case 1:
                    Gerente.verDados();
                    break;
                
                case 2:
                    nome = teclado("Digite o novo nome: ")
                    senha = teclado("Digite a nova senha: ")
                    Gerente.modificarDados(nome,senha);
                    break;

                case 3:
                    for (let p of Gerente.projetos){
                        console.log(p.nome)
                    };
                    break;

                case 4:
                    
                    break;

                case 5:
                    
                    break;

                case 0: break;
                
                default:
                    break;
            }
        }

    }

}

class Projeto {
    static projetos: Projeto[] = [];
    static lastId: number = 0;
  
    id: number;
    nome: string;
    gerente: Gerente;
    consultores: Consultor[];
    etapas: string[];
    etapaAtual: number;
  
    constructor(nome: string, gerente: Gerente, consultores: Consultor[], etapas: string[]) {
      
      Projeto.lastId++;
      this.id = Projeto.lastId;
      this.nome = nome;
      this.gerente = gerente;
      this.consultores = consultores;
      this.etapas = etapas;
      this.etapaAtual = 0;
      Projeto.projetos.push(this);

    }
  
    static criarProjeto(nome: string, gerente: Gerente, consultores: Consultor[], etapas: string[]): void {
      new Projeto(nome, gerente, consultores, etapas);
      console.log(`Projeto ${nome} criado com sucesso.`);
    }
  
    static removerProjeto(projeto: Projeto): void {
  
    projeto.gerente.projetos = projeto.gerente.projetos.filter(p => p !== projeto);
    
    for(let consultor of projeto.consultores){
        consultor.projetos =consultor.projetos.filter(p => p !== projeto);
    }
    
    Projeto.projetos = Projeto.projetos.filter(p => p !== projeto);

    console.log(`Projeto ${projeto.nome} removido com sucesso.`);
    }
  
    static listarProjeto(): void {
      console.log('Projetos:');
      Projeto.projetos.forEach(p => console.log(`- ${p.nome}`));
    }

    pedirRetirada(consultor: Consultor): void {
      if (!this.consultores.includes(consultor)) {
        console.log(`O consultor ${consultor.nome} não está alocado no projeto ${this.nome}.`);
        return;
      }
  
      this.consultores = this.consultores.filter(c => c !== consultor);
  
      console.log(`O consultor ${consultor.nome} pediu retirada do projeto ${this.nome}.`);
    }
  
    gerenteAprovaRetirada(consultor: Consultor): void {
      if (!this.consultores.includes(consultor)) {
        console.log(`O consultor ${consultor.nome} não está alocado no projeto ${this.nome}.`);
        return;
      }
  
      this.consultores = this.consultores.filter(c => c !== consultor);
  
      console.log(`O gerente ${this.gerente.nome} aprovou a retirada do consultor ${consultor.nome} do projeto ${this.nome}.`);
    }
}

abstract class Usuario {
    static lastId: number = 0;

    id: number;
    nome: string;
    senha: string;
    projetos: Projeto[];
  
    constructor(nome: string, senha: string) {
      
      Usuario.lastId++;
      this.id = Usuario.lastId;
      this.nome = nome;
      this.senha = senha;
      this.projetos = [];
    }
  
    verDados() {
      console.log(`ID: ${this.id}  Nome: ${this.nome} `);
    }
  
    modificarDados(novoNome: string, novaSenha: string) {
      this.nome = novoNome;
      this.senha = novaSenha;
    }

    verProjetos() {
        console.log("Projetos alocados:");
        this.projetos.forEach((projeto) => {
        console.log(projeto.nome);
        });
    }

    static criarConsultor(nome: string, senha: string){
        new Consultor(nome,senha);
        console.log(`Consultor ${nome} criado com sucesso.`);
    }

    static criarGerente(nome: string, senha: string){
        new Gerente(nome,senha);
        console.log(`Gerente ${nome} criado com sucesso.`);
    }
  
    static verConsultores(){
        console.log("Consultores:");
        Consultor.Consultores.forEach((consultor)=>{
        console.log(consultor.nome);
        });
    }

    static verGerentes(){
        console.log("Gerentes:");
        Gerente.Gerentes.forEach((gerente)=>{
        console.log(gerente.nome);
        });

    }

    static removerConsultor(nome:string){
        Consultor.Consultores = Consultor.Consultores.filter(c => c.nome !== nome);
        };
    
    static removerGerente(nome:string){
        Gerente.Gerentes = Gerente.Gerentes.filter(c => c.nome !== nome);
        };
}

class Consultor extends Usuario {

    static Consultores:Consultor[] = []

    constructor(nome: string, senha: string) {
        super(nome, senha);
        Consultor.Consultores.push(this);
    }

    avancarProjeto(projeto: Projeto, etapa: number) {
        if (!this.projetos.includes(projeto)) {
        console.log(`Você não está alocado no projeto ${projeto.nome}.`);
        return;
        }
        if (projeto.etapaAtual != etapa - 1) {
        console.log(`Você só pode avançar para a etapa ${etapa} quando a etapa ${etapa - 1} for aprovada pelo gerente.`);
        return;
        }
        projeto.etapaAtual = etapa;
        console.log(`Você avançou para a etapa ${etapa} do projeto ${projeto.nome}.`);
    }

    /*pedirRetirada(projeto: Projeto) {
        if (!this.projetos.includes(projeto)) {
        console.log(`Você não está alocado no projeto ${projeto.nome}.`);
        return;
        }
        projeto.consultorSai(projeto, this);
        console.log(`Você pediu para ser retirado do projeto ${projeto.nome}.`);
    }*/
}

class Gerente extends Usuario {

    static Gerentes:Gerente[] = []

    constructor(nome: string, senha: string) {
      super(nome, senha);
      Gerente.Gerentes.push(this);
    }
  
    public adicionarProjeto(projeto: Projeto): void {
      if (this.projetos.includes(projeto)) {
        console.log(`O projeto ${projeto.nome} já está alocado para você.`);
        return;
      }
      this.projetos.push(projeto);
      console.log(`O projeto ${projeto.nome} foi adicionado à sua lista.`);
    }
  
    public removerProjeto(projeto: Projeto): void {
      if (!this.projetos.includes(projeto)) {
        console.log(`Você não está alocado no projeto ${projeto.nome}.`);
        return;
      }
      this.projetos = this.projetos.filter((p) => p !== projeto);
      console.log(`O projeto ${projeto.nome} foi removido da sua lista.`);
    }
  
    public listarProjetos(): void {
      if (this.projetos.length === 0) {
        console.log("Você não está alocado em nenhum projeto.");
        return;
      }
      console.log(`Projetos alocados para ${this.nome}:`);
      this.projetos.forEach((projeto) => console.log(`- ${projeto.nome}`));
    }
  
    public passarProjeto(projeto: Projeto, novoGerente: Gerente): void {
      if (!this.projetos.includes(projeto)) {
        console.log(`Você não está alocado no projeto ${projeto.nome}.`);
        return;
      }
      novoGerente.adicionarProjeto(projeto);
      this.removerProjeto(projeto);
      console.log(`O projeto ${projeto.nome} foi passado para o gerente ${novoGerente.nome}.`);
    }
  
    public entregarProjeto(projeto: Projeto): void {
      if (!this.projetos.includes(projeto)) {
        console.log(`Você não está alocado no projeto ${projeto.nome}.`);
        return;
      }
      this.removerProjeto(projeto);
      console.log(`O projeto ${projeto.nome} foi entregue.`);
    }
}

Sistema.menu()