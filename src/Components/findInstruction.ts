/*
    This file takes an assembly instruction and finds its corresponding
    opcode, funct3 and register decimal values
*/

const findInstruction = (mnemonic:string) => {

    let opcode:number = 0
    let funct3 = null;
    let funct7 = null;
    let instructionType:string = "";

    // Determine opcode, funct3 and funct7 of mnemonic (just a bunch of if statments :( ))
    switch (mnemonic) {

        case "lb":
            opcode = 0b0000011;
            funct3 = 0;
            instructionType = "I";
            break;
        
        case "lh":
            opcode = 0b0000011;
            funct3 = 0b001;
            instructionType = "I";
            break;

        case "lw":
            opcode = 0b0000011;
            funct3 = 0b010;
            instructionType = "I";
            break

        case "ld":
            opcode = 0b0000011;
            funct3 = 0b011;
            instructionType = "I";
            break

        case "lbu":
            opcode = 0b0000011;
            funct3 = 0b100;
            instructionType = "I";
            break

        case "lhu":
            opcode = 0b0000011;
            funct3 = 0b101;
            instructionType = "I";
            break

        case "lwu":
            opcode = 0b0000011;
            funct3 = 0b110;
            instructionType = "I";
            break

        case "fence":
            opcode = 0b0001111;
            funct3 = 0b000;
            instructionType = "I";
            break;

        case "fence.i":
            opcode = 0b0001111;
            funct3 = 0b001;
            instructionType = "I";
            break;

        case "addi":
            opcode = 0b0010011;
            funct3 = 0;
            instructionType = "I";
            break;

        case "slli":
            opcode = 0b0010011;
            funct3 = 0b001;
            instructionType = "I";
            funct7 = 0;
            break;

        case "slti":
            opcode = 0b0010011;
            funct3 = 0b010;
            instructionType = "I";
            break;

        case "sltiu":
            opcode = 0b0010011;
            funct3 = 0b011;
            instructionType = "I";
            break;

        case "xori":
            opcode = 0b0010011;
            funct3 = 0b100;
            instructionType = "I";
            break;
    
        case "srli":
            opcode = 0b0010011;
            funct3 = 0b101;
            instructionType = "I";
            funct7 = 0
            break;
    
        case "srai":
            opcode = 0b0010011;
            funct3 = 0b101;
            instructionType = "I";
            funct7 = 0b0100000;
            break;

        case "ori":
            opcode = 0b0010011;
            funct3 = 0b110;
            instructionType = "I";
            break;

        case "andi":
            opcode = 0b0010011;
            funct3 = 0b111;
            instructionType = "I";
            break;

        case "auipc":
            opcode = 0b0010111
            funct3 = null
            instructionType = "U";
            break;

        case "addiw":
            opcode = 0b0011011
            funct3 = 0
            instructionType = "I";
            break;

        case "slliw":
            opcode = 0b0011011
            funct3 = 0b001
            funct7 = 0
            instructionType = "I"
            break

        case "srliw":
            opcode = 0b0011011
            funct3 = 0b101
            funct7 = 0
            instructionType = "I"
            break

        case "sraiw":
            opcode = 0b0011011
            funct3 = 0b101
            funct7 = 0b0100000
            instructionType = "R"
            break

        case "sb":
            opcode = 0b0100011
            funct3 = 0
            instructionType = "S"
            break

        case "sh":
            opcode = 0b0100011
            funct3 = 0b001
            instructionType = "S"
            break

        case "sw":
            opcode = 0b0100011
            funct3 = 0b010
            instructionType = "S"
            break

        case "sd":
            opcode = 0b0100011
            funct3 = 0b011
            instructionType = "I"
            break

    }

    return [opcode, funct3, funct7, instructionType];


}

export default findInstruction