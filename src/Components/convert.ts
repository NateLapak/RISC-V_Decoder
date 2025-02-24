import determineInstruct from "./determineInstruct";
import determineRegister from "./determineRegister";

// This file handles the functionalitny and logic for converting a binary or hexadecimal number into 
// it's RISC-V instruction
const convert = (instruction: string) => {

    // Instruction is not a valid hex or binary number, return Invalid
    if (!instruction) return "Invalid input";

    let result:string = "";

    let opcode:string = "";
    let instructionType:string = "";

    // If instruction was given in hexadecimal, convert to binary
    const convertToHex = (instruction: string) => {
        let hex_num: number = +instruction;
        return hex_num.toString(16).padStart(8, '0');
    }

    // Determine type of RISC-V instruction.
    const determineOpcode = (instruction:string) => {

        // Convert string to number
        let new_num:number = +instruction;

        // Mask the lowest 7 bits that represent the opcode
        let getOpcode:number = new_num & 0x7F;

        // Adjust opcode so that it fits into 7 bits all the time
        let adjustNum: string = getOpcode.toString(2).padStart(7, '0');
        
        return adjustNum
    }

    // Determine type of RISC-V instruction (I-type, R-type, S-type, etc)
    const determineType = (instruction:string, opcode:string) => {

        /*
            R-type = 1
            I-type arithmetic = 2 
            I-type Load = 3
            I-type Jump = 4
            S-type Store = 5
            SB-type (branch instruct) = 6
            U-type (Load Upper Immediate) = 7
            U-type (AUPIC) = 8
            J-type (JAL) = 9
            Default = 10
        */

        let new_instruction:string = "";



        // Determine type using opcode
        switch (opcode) {
            case "0110011":
                new_instruction = RType(instruction, 1);
                break;

            case "0010011":
                new_instruction = ITypeArithmetic(instruction, 2);
                break;

            case "0000011":
                new_instruction = ITypeLoad(instruction, 3)
                break;

            case "1100111":
                new_instruction = ITypeJump(instruction, 4);
                break;

            case "0100011":
                new_instruction = STypeStore(instruction, 5);
                break;

            case "1100011":
                new_instruction = SBType(instruction, 6);
                break;

            case "0110111":
                new_instruction = UTypeLUI(instruction, 7);
                break;

            case "0010111":
                new_instruction = UTypeAUPIC(instruction, 8);
                break;

            case "1101111":
                new_instruction = JType(instruction, 9);
                break;

            default:
                break;

        }
        return new_instruction;
    }

    // R-type instructions
    const RType = (instruction:string, type:number) => {
        

        let new_num = +instruction;
        let temp: string = "";

        // Get rd
        let getRD: number = (new_num >> 7) & 0x1F; // 0x1F = 0b11111

        // Get funct3
        let getfunct3: number = (new_num >> 12) & 0x7; // 0x7 = 0b111

        // Get rs1
        let getrs1: number = (new_num >> 15) & 0x1F; // 0x1F = 0b11111

        // Get rs2
        let getrs2: number = (new_num >> 20) & 0x1F; // 0x1F = 0b11111

        // Get funct7
        let getfunct7: number = (new_num >> 25) & 0x7F; // 0x7F = 0b01111111

        // Get register name and instruction
        let rd:string = determineRegister(getRD);
        let translatedInstruction:string = determineInstruct(getfunct3, type, getfunct7);
        let rs1:string = determineRegister(getrs1);
        let rs2:string = determineRegister(getrs2);


        temp = translatedInstruction + " " + rd + ", " + rs1 + ", " + rs2;
        return temp;


    }
    
    // I-Type Arithmetic instruction
    const ITypeArithmetic = (instruction:string, type:number) => {

        let new_num = +instruction;
        let temp: string = "";

        // Get rd
        let getRD:number = new_num >> 7
        getRD = getRD & 0x1F;

        // Get funct3
        let getfunct3:number = new_num >> 12;
        getfunct3 = getfunct3 & 0x7;

        // Get rs1
        let getrs1:number = new_num >> 15;
        getrs1 = getrs1 & 0x1F;

        // Get immediate
        let getimm:number = new_num >> 20;
        getimm = getimm & 0xFFF;

        let rd:string = determineRegister(getRD);
        let translatedInstruction:string = determineInstruct(getfunct3, type, 0);
        let rs1:string = determineRegister(getrs1);
        let imm:string = getimm.toString();


        temp = translatedInstruction + " " + rd + ", " + rs1 + ", " + imm;
        return temp;
    }


    // I-Type Load instruction
    const ITypeLoad = (instruction:string, type:number) => {

        let new_num = +instruction;
        let temp: string = "";

        // Get rd
        let getRD:number = new_num >> 7
        getRD = getRD & 0x1F;

        // Get funct3
        let getfunct3:number = new_num >> 12;
        getfunct3 = getfunct3 & 0x7;

        // Get rs1
        let getrs1:number = new_num >> 15;
        getrs1 = getrs1 & 0x1F;

        // Get immediate
        let getimm:number = new_num >> 20;
        getimm = getimm & 0xFFF;

        let rd:string = determineRegister(getRD);
        let translatedInstruction:string = determineInstruct(getfunct3, type, 0);
        let rs1:string = determineRegister(getrs1);
        let imm:string = getimm.toString();


        temp = translatedInstruction + " " + rd + ", " + imm + "(" + rs1 + ")";
        return temp;

    }

    // I-Type Jump instruction
    const ITypeJump = (instruction:string, type:number) => {

        let new_num = +instruction;
        let temp: string = "";

        // Get rd
        let getRD:number = new_num >> 7
        getRD = getRD & 0x1F;

        // Get funct3
        let getfunct3:number = new_num >> 12;
        getfunct3 = getfunct3 & 0x7;

        // Get rs1
        let getrs1:number = new_num >> 15;
        getrs1 = getrs1 & 0x1F;

        // Get immediate
        let getimm:number = new_num >> 20;
        getimm = getimm & 0xFFF;

        let rd:string = determineRegister(getRD);
        let translatedInstruction:string = determineInstruct(getfunct3, type, 0);
        let rs1:string = determineRegister(getrs1);
        let imm:string = getimm.toString();

        temp = translatedInstruction + " " + rd + ", " + imm + "(" + rs1 + ")";
        return temp;
    }

    // S-type Store instruction
    const STypeStore = (instruction:string, type:number) => {

        let new_num = +instruction;
        let temp: string = "";

        // Get imm[4:0]
        let firstimm:number = (new_num >> 7) & 0x1F;

        // Get funct3
        let getfunct3:number = (new_num >> 12)  & 0x7;

        // Get rs1
        let getrs1: number = (new_num >> 15) & 0x1F; // 0x1F = 0b11111

        // Get rs2
        let getrs2: number = (new_num >> 20) & 0x1F; // 0x1F = 0b11111
        
        // Get imm[11:5]
        let secondimm: number = (new_num >> 25) & 0x7F; // 0x7F = 0b01111111
        
        // Combine immediate
        let combinedImm: number = (secondimm << 5) | firstimm;

        // Get register name and instruction
        let translatedInstruction:string = determineInstruct(getfunct3, type, 0);
        let rs1:string = determineRegister(getrs1);
        let rs2:string = determineRegister(getrs2);
        
        
        temp = translatedInstruction + " " + rs2 + ", " + combinedImm + "(" + rs1 + ")";
        return temp;
    }

    // Branch instruction
    const SBType = (instruction:string, type:number) => {
        return instruction;
    }

    // U-Type Load Upper Immediate (LUI)
    const UTypeLUI = (instruction:string, type:number) => {
        return instruction;
    }

    // U-type Add Upper Immediate to PC
    const UTypeAUPIC = (instruction:string, type:number) => {
        return instruction;
    }

    // Jump and Link instruction
    const JType = (instruction:string, type:number) => {

        let new_num = +instruction;
        let temp: string = "";

        // Get rd
        let getRD:number = new_num >> 7
        getRD = getRD & 0x1F;

        // Extract immediate
        let imm: number = 0;

        // imm[20] (bit 31 of the instruction)
        imm |= (new_num >> 31) & 0x1;

        // imm[10:1] (bits 21 to 30 of the instruction)
        imm |= ((new_num >> 21) & 0x3FF) << 1;

        // imm[11] (bit 20 of the instruction)
        imm |= ((new_num >> 20) & 0x1) << 11;

        // imm[19:12] (bits 12 to 19 of the instruction)
        imm |= ((new_num >> 12) & 0xFF) << 12;

        // Sign extension (need to fix negative numbers)
        if (imm & (1 << 20)) {
            imm |= ~((1 << 21) - 1);
        }

        let rd:string = determineRegister(getRD);

        temp = "jal " + rd + ", " + imm;
        return temp;

    }

    // Input is in binary, 
    if (instruction.startsWith("0b")) {
        instruction = "0x" + convertToHex(instruction);
        opcode = determineOpcode(instruction);
        instructionType = determineType(instruction, opcode);
        result = instructionType;
    } else if (instruction.startsWith("0x")) {
        opcode = determineOpcode(instruction);
        instructionType = determineType(instruction, opcode);
        result = instructionType;
    } else {
        result = "Invalid input, make sure to put the prefix 0b (binary) or 0x (hexadecimal)";
    }

    return result;
}

export default convert