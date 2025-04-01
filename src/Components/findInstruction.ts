/*
    This file takes an assembly instruction and finds its corresponding
    opcode, funct3 and register decimal values
*/

const findInstruction = (mnemonic:string) => {

    let opcode:number = 0
    let funct3 = null;
    let funct7 = null;
    let instructionType:string = "";

    // Determine opcode, funct3 and funct7 of mnemonic (just a bunch of if statments :( )
    switch (mnemonic) {

        case "lb":
            opcode = 0b0000011;
            funct3 = 0;
            instructionType = "I-Type";
            break;
        
        case "lh":
            opcode = 0b0000011;
            funct3 = 0b001;
            instructionType = "I-Type";
            break;

        case "lw":
            opcode = 0b0000011;
            funct3 = 0b010;
            instructionType = "I-Type";
            break

        case "ld":
            opcode = 0b0000011;
            funct3 = 0b011;
            instructionType = "I-Type";
            break

        case "lbu":
            opcode = 0b0000011;
            funct3 = 0b100;
            instructionType = "I-Type";
            break

        case "lhu":
            opcode = 0b0000011;
            funct3 = 0b101;
            instructionType = "I-Type";
            break

        case "lwu":
            opcode = 0b0000011;
            funct3 = 0b110;
            instructionType = "I-Type";
            break

        case "fence":
            opcode = 0b0001111;
            funct3 = 0b000;
            instructionType = "I-Type";
            break;

        case "fence.i":
            opcode = 0b0001111;
            funct3 = 0b001;
            instructionType = "I-Type";
            break;

        case "addi":
            opcode = 0b0010011;
            funct3 = 0;
            instructionType = "I-Type";
            break;

        case "slli":
            opcode = 0b0010011;
            funct3 = 0b001;
            instructionType = "I-Type";
            funct7 = 0;
            break;

        case "slti":
            opcode = 0b0010011;
            funct3 = 0b010;
            instructionType = "I-Type";
            break;

        case "sltiu":
            opcode = 0b0010011;
            funct3 = 0b011;
            instructionType = "I-Type";
            break;

        case "xori":
            opcode = 0b0010011;
            funct3 = 0b100;
            instructionType = "I-Type";
            break;
    
        case "srli":
            opcode = 0b0010011;
            funct3 = 0b101;
            instructionType = "I-Type";
            funct7 = 0
            break;
    
        case "srai":
            opcode = 0b0010011;
            funct3 = 0b101;
            instructionType = "I-Type";
            funct7 = 0b0100000;
            break;

        case "ori":
            opcode = 0b0010011;
            funct3 = 0b110;
            instructionType = "I-Type";
            break;

        case "andi":
            opcode = 0b0010011;
            funct3 = 0b111;
            instructionType = "I-Type";
            break;

        case "auipc":
            opcode = 0b0010111
            funct3 = null
            instructionType = "U-Type";
            break;

        case "addiw":
            opcode = 0b0011011
            funct3 = 0
            instructionType = "I-Type";
            break;

        case "slliw":
            opcode = 0b0011011
            funct3 = 0b001
            funct7 = 0
            instructionType = "I-Type"
            break

        case "srliw":
            opcode = 0b0011011
            funct3 = 0b101
            funct7 = 0
            instructionType = "I-Type"
            break

        case "sraiw":
            opcode = 0b0011011
            funct3 = 0b101
            funct7 = 0b0100000
            instructionType = "R-Type"
            break

        case "sb":
            opcode = 0b0100011
            funct3 = 0
            instructionType = "S-Type"
            break

        case "sh":
            opcode = 0b0100011
            funct3 = 0b001
            instructionType = "S-Type"
            break

        case "sw":
            opcode = 0b0100011
            funct3 = 0b010
            instructionType = "S-Type"
            break

        case "sd":
            opcode = 0b0100011
            funct3 = 0b011
            instructionType = "I-Type"
            break

        case "add":
            opcode = 0b0110011  
            funct3 = 0
            funct7 = 0
            instructionType = "R-Type"
            break

        case "sub":
            opcode = 0b0110011  
            funct3 = 0
            funct7 = 0b0100000
            instructionType = "R-Type"
            break

        case "sll":
            opcode = 0b0110011  
            funct3 = 0b001
            funct7 = 0
            instructionType = "R-Type"
            break
        
        case "slt":
            opcode = 0b0110011  
            funct3 = 0b010
            funct7 = 0
            instructionType = "R-Type"
            break

        case "sltu":
            opcode = 0b0110011  
            funct3 = 0b011
            funct7 = 0
            instructionType = "R-Type"
            break

        case "xor":
            opcode = 0b0110011  
            funct3 = 0b100
            funct7 = 0
            instructionType = "R-Type"
            break

        case "srl":
            opcode = 0b0110011  
            funct3 = 0b101
            funct7 = 0
            instructionType = "R-Type"
            break

        case "sra":
            opcode = 0b0110011  
            funct3 = 0b101
            funct7 = 0b0100000
            instructionType = "R-Type"
            break

        case "or":
            opcode = 0b0110011  
            funct3 = 0b110
            funct7 = 0
            instructionType = "R-Type"
            break

        case "and":
            opcode = 0b0110011  
            funct3 = 0b111
            funct7 = 0
            instructionType = "R-Type"
            break

        case "lui":
            opcode = 0b0110111  
            instructionType = "U-Type"
            break

        case "addw":
            opcode = 0b0111011
            funct3 = 0
            funct7 = 0
            instructionType = "R-Type"
            break

        case "subw":
            opcode = 0b0111011
            funct3 = 0
            funct7 = 0b0100000
            instructionType = "R-Type"
            break

        case "sllw":
            opcode = 0b0111011
            funct3 = 0b001
            funct7 = 0
            instructionType = "R-Type"
            break

        case "srlw":
            opcode = 0b0111011
            funct3 = 0b101
            funct7 = 0
            instructionType = "R-Type"
            break

        case "sraw":
            opcode = 0b0111011
            funct3 = 0b101
            funct7 = 0b0100000
            instructionType = "R-Type"
            break

        case "beq":
            opcode = 0b1100011
            funct3 = 0
            instructionType = "SB-Type"
            break

        case "bne":
            opcode = 0b1100011
            funct3 = 0b001
            instructionType = "SB-Type"
            break

        case "blt":
            opcode = 0b1100011
            funct3 = 0b100
            instructionType = "SB-Type"
            break

        case "bge":
            opcode = 0b1100011
            funct3 = 0b101
            instructionType = "SB-Type"
            break

        case "bltu":
            opcode = 0b1100011
            funct3 = 0b110
            instructionType = "SB-Type"
            break

        case "bgeu":
            opcode = 0b1100011
            funct3 = 0b111
            instructionType = "SB-Type"
            break

        case "jalr":
            opcode = 0b1100111
            funct3 = 0
            instructionType = "I-Type"
            break

        case "jal":
            opcode = 0b1101111
            instructionType = "UJ-Type"
            break

        case "ecall":
            opcode = 0b1110011
            funct3 = 0
            funct7 = 0
            instructionType = "I-Type"
            break

        case "ebreak":
            opcode = 0b1110011
            funct3 = 0
            funct7 = 0b000000000001
            instructionType = "I-Type"
            break

        case "csrrw":
            opcode = 0b1110011
            funct3 = 0b001
            instructionType = "I-Type"
            break

        case "csrrs":
            opcode = 0b1110011
            funct3 = 0b010
            instructionType = "I-Type"
            break

        case "csrrc":
            opcode = 0b1110011
            funct3 = 0b011
            instructionType = "I-Type"
            break

        case "csrrwi":
            opcode = 0b1110011
            funct3 = 0b101
            instructionType = "I-Type"
            break

        case "csrrsi":
            opcode = 0b1110011
            funct3 = 0b110
            instructionType = "I-Type"
            break

        case "csrrsi":
            opcode = 0b1110011
            funct3 = 0b111
            instructionType = "I-Type"
            break

        default:
            opcode = 0
            instructionType = "None"
            break
    }

    return [opcode, funct3, funct7, instructionType];

}

export default findInstruction