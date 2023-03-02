"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class Sistema {
    static menu() {
        var teclado = (0, prompt_sync_1.default)();
        let opcao = 10;
        while (opcao != 0) {
            console.clear();
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
            let nome;
            let senha;
            let nome_gerente;
            let nomes_consultores;
            let etapas;
            let gerente;
            let consultores;
            let resposta;
            let projeto;
            switch (opcao) {
                case 1:
                    nome = teclado("Digite um nome: ");
                    senha = teclado("Digite uma senha: ");
                    Usuario.criarConsultor(nome, senha);
                    break;
                case 2:
                    nome = teclado("Digite o nome do Consultor: ");
                    Usuario.removerConsultor(nome);
                    break;
                case 3:
                    nome = teclado("Digite um nome: ");
                    senha = teclado("Digite uma senha: ");
                    Usuario.criarGerente(nome, senha);
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
                    consultores = Consultor.Consultores.filter((consultor) => nomes_consultores.includes(consultor.nome));
                    Projeto.criarProjeto(nome, gerente, consultores, etapas);
                    break;
                case 6:
                    nome = teclado("Digite o nome do projeto: ");
                    projeto = Projeto.projetos.filter(p => p.nome == nome)[0];
                    Projeto.removerProjeto(projeto);
                    break;
                case 7:
                    resposta = +teclado("Deseja mostrar os 1.Consultores, 2.Gerentes, 3.Projetos");
                    switch (resposta) {
                        case 1:
                            console.log(Usuario.verConsultores());
                            break;
                        case 2:
                            console.log(Usuario.verGerentes());
                            break;
                        case 3:
                            console.log(Projeto.listarProjeto());
                            break;
                        default:
                            break;
                    }
                case 8:
                    resposta = +teclado("Deseja logar como: 1.Consultor / 2.Gerente");
                    nome = teclado("Digite seu nome: ");
                    senha = teclado("Digite sua senha: ");
                    switch (resposta) {
                        case 1:
                            Consultor.Consultores.forEach(element => {
                                if (element.nome == nome && element.senha == senha) {
                                }
                            });
                            break;
                        case 2:
                            Gerente.Gerentes.forEach(element => {
                                if (element.nome == nome && element.senha == senha) {
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
    loginConsultor(Consultor) {
        var teclado = (0, prompt_sync_1.default)();
        let opcao = 10;
        while (opcao != 0) {
            console.clear();
            console.log("1 - Ver meus dados");
            console.log("2 - Modificar meus dados");
            console.log("3 - Verificar Projetos onde estou alocado");
            console.log("4 - Avançar com um projeto");
            console.log("5 - Pedir retirada de um projeto");
            console.log("0 - Sair");
            opcao = +teclado("Escolha uma opcao: ");
            let nome;
            let senha;
            switch (opcao) {
                case 1:
                    Consultor.verDados();
                    break;
                case 2:
                    nome = teclado("Digite o novo nome: ");
                    senha = teclado("Digite a nova senha: ");
                    Consultor.modificarDados(nome, senha);
                    break;
                case 3:
                    for (let p of Consultor.projetos) {
                        console.log(p.nome);
                    }
                    ;
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
    loginGerente(Gerente) {
        var teclado = (0, prompt_sync_1.default)();
        let opcao = 10;
        while (opcao != 0) {
            console.clear();
            console.log("1 - Ver meus dados");
            console.log("2 - Modificar meus dados");
            console.log("3 - Verificar Projetos onde estou alocado");
            console.log("4 - Avançar com um projeto e entregar");
            console.log("5 - Aprovar retirada de um projeto");
            console.log("6 - Passar projeto para outro gerente");
            console.log("0 - Sair");
            opcao = +teclado("Escolha uma opcao: ");
            let nome;
            let senha;
            switch (opcao) {
                case 1:
                    Gerente.verDados();
                    break;
                case 2:
                    nome = teclado("Digite o novo nome: ");
                    senha = teclado("Digite a nova senha: ");
                    Gerente.modificarDados(nome, senha);
                    break;
                case 3:
                    for (let p of Gerente.projetos) {
                        console.log(p.nome);
                    }
                    ;
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
    constructor(nome, gerente, consultores, etapas) {
        Projeto.lastId++;
        this.id = Projeto.lastId;
        this.nome = nome;
        this.gerente = gerente;
        this.consultores = consultores;
        this.etapas = etapas;
        this.etapaAtual = 0;
        Projeto.projetos.push(this);
    }
    static criarProjeto(nome, gerente, consultores, etapas) {
        new Projeto(nome, gerente, consultores, etapas);
        console.log(`Projeto ${nome} criado com sucesso.`);
    }
    static removerProjeto(projeto) {
        projeto.gerente.projetos = projeto.gerente.projetos.filter(p => p !== projeto);
        for (let consultor of projeto.consultores) {
            consultor.projetos = consultor.projetos.filter(p => p !== projeto);
        }
        Projeto.projetos = Projeto.projetos.filter(p => p !== projeto);
        console.log(`Projeto ${projeto.nome} removido com sucesso.`);
    }
    static listarProjeto() {
        console.log('Projetos:');
        Projeto.projetos.forEach(p => console.log(`- ${p.nome}`));
    }
    pedirRetirada(consultor) {
        if (!this.consultores.includes(consultor)) {
            console.log(`O consultor ${consultor.nome} não está alocado no projeto ${this.nome}.`);
            return;
        }
        this.consultores = this.consultores.filter(c => c !== consultor);
        console.log(`O consultor ${consultor.nome} pediu retirada do projeto ${this.nome}.`);
    }
    gerenteAprovaRetirada(consultor) {
        if (!this.consultores.includes(consultor)) {
            console.log(`O consultor ${consultor.nome} não está alocado no projeto ${this.nome}.`);
            return;
        }
        this.consultores = this.consultores.filter(c => c !== consultor);
        console.log(`O gerente ${this.gerente.nome} aprovou a retirada do consultor ${consultor.nome} do projeto ${this.nome}.`);
    }
}
Projeto.projetos = [];
Projeto.lastId = 0;
class Usuario {
    constructor(nome, senha) {
        Usuario.lastId++;
        this.id = Usuario.lastId;
        this.nome = nome;
        this.senha = senha;
        this.projetos = [];
    }
    verDados() {
        console.log(`ID: ${this.id}  Nome: ${this.nome} `);
    }
    modificarDados(novoNome, novaSenha) {
        this.nome = novoNome;
        this.senha = novaSenha;
    }
    verProjetos() {
        console.log("Projetos alocados:");
        this.projetos.forEach((projeto) => {
            console.log(projeto.nome);
        });
    }
    static criarConsultor(nome, senha) {
        new Consultor(nome, senha);
        console.log(`Consultor ${nome} criado com sucesso.`);
    }
    static criarGerente(nome, senha) {
        new Gerente(nome, senha);
        console.log(`Gerente ${nome} criado com sucesso.`);
    }
    static verConsultores() {
        console.log("Consultores:");
        Consultor.Consultores.forEach((consultor) => {
            console.log(consultor.nome);
        });
    }
    static verGerentes() {
        console.log("Gerentes:");
        Gerente.Gerentes.forEach((gerente) => {
            console.log(gerente.nome);
        });
    }
    static removerConsultor(nome) {
        Consultor.Consultores = Consultor.Consultores.filter(c => c.nome !== nome);
    }
    ;
    static removerGerente(nome) {
        Gerente.Gerentes = Gerente.Gerentes.filter(c => c.nome !== nome);
    }
    ;
}
Usuario.lastId = 0;
class Consultor extends Usuario {
    constructor(nome, senha) {
        super(nome, senha);
        Consultor.Consultores.push(this);
    }
    avancarProjeto(projeto, etapa) {
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
}
Consultor.Consultores = [];
class Gerente extends Usuario {
    constructor(nome, senha) {
        super(nome, senha);
        Gerente.Gerentes.push(this);
    }
    adicionarProjeto(projeto) {
        if (this.projetos.includes(projeto)) {
            console.log(`O projeto ${projeto.nome} já está alocado para você.`);
            return;
        }
        this.projetos.push(projeto);
        console.log(`O projeto ${projeto.nome} foi adicionado à sua lista.`);
    }
    removerProjeto(projeto) {
        if (!this.projetos.includes(projeto)) {
            console.log(`Você não está alocado no projeto ${projeto.nome}.`);
            return;
        }
        this.projetos = this.projetos.filter((p) => p !== projeto);
        console.log(`O projeto ${projeto.nome} foi removido da sua lista.`);
    }
    listarProjetos() {
        if (this.projetos.length === 0) {
            console.log("Você não está alocado em nenhum projeto.");
            return;
        }
        console.log(`Projetos alocados para ${this.nome}:`);
        this.projetos.forEach((projeto) => console.log(`- ${projeto.nome}`));
    }
    passarProjeto(projeto, novoGerente) {
        if (!this.projetos.includes(projeto)) {
            console.log(`Você não está alocado no projeto ${projeto.nome}.`);
            return;
        }
        novoGerente.adicionarProjeto(projeto);
        this.removerProjeto(projeto);
        console.log(`O projeto ${projeto.nome} foi passado para o gerente ${novoGerente.nome}.`);
    }
    entregarProjeto(projeto) {
        if (!this.projetos.includes(projeto)) {
            console.log(`Você não está alocado no projeto ${projeto.nome}.`);
            return;
        }
        this.removerProjeto(projeto);
        console.log(`O projeto ${projeto.nome} foi entregue.`);
    }
}
Gerente.Gerentes = [];
Sistema.menu();
