interface Boleto {
    id: string;
    nome: string;
    valor: number;
    email: string;
  }
  
  class ProcessedBoletoService {
    private processedBoletos: Map<string, Boleto>;
  
    constructor() {
      this.processedBoletos = new Map();
    }
  
    addBoleto(boleto: Boleto): void {
      this.processedBoletos.set(boleto.id, boleto);
    }
  
    isBoletoProcessed(boletoId: string): boolean {
      return this.processedBoletos.has(boletoId);
    }
  
    getProcessedBoletos(): Map<string, Boleto> {
      return this.processedBoletos;
    }
  }
  
  export const processedBoletoService = new ProcessedBoletoService();
  