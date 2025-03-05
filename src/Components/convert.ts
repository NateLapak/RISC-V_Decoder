/*
    Convert.ts: 
    Handles the logic for encoding and decoding RISC-V instructions and hexadecimal number.
    The function convert(instruction) coverts binary or hex to assembly
    The function encode(instruction) converts assembly to hex
    Written by Nathan Lapak
*/

import determineInstruct from "./determineInstruct";
import determineRegister from "./determineRegister";
import findInstruction from "./findInstruction";

// This function handles the functionalitny and logic for converting a binary or hexadecimal number into it's RISC-V instruction
export const convert = (instruction: string) => {

    let result:string = "";

    let opcode:string = "";
    let RISCV_Instruction:string = "";
    let instructionType: string = "";

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

            // R-type opcode
            case "0110011":
                new_instruction = RType(instruction, 1);
                instructionType = "R-Type";
                break;

            // I-type arithmetic opcode
            case "0010011":
                new_instruction = ITypeArithmetic(instruction, 2);
                instructionType = "I-Type"
                break;

            // I-type Load opcode
            case "0000011":
                new_instruction = ITypeLoad(instruction, 3)
                instructionType = "I-Type"
                break;

            // I-type Jump opcode
            case "1100111":
                new_instruction = ITypeJump(instruction, 4);
                instructionType = "I-Type"
                break;

            // S-type opcode
            case "0100011":
                new_instruction = STypeStore(instruction, 5);
                instructionType = "S-Type"
                break;

            // SB-type opcode
            case "1100011":
                new_instruction = SBType(instruction, 6);
                instructionType = "SB-Type"
                break;

            // U-type lui opcode
            case "0110111":
                new_instruction = UTypeLUI(instruction);
                instructionType = "U-Type"
                break;

            // U-type (AUPIC) opcode
            case "0010111":
                new_instruction = UTypeAUPIC(instruction);
                instructionType = "U-Type"
                break;

            // J-type opcode
            case "1101111":
                new_instruction = JType(instruction);
                instructionType = "UJ-Type"
                break;

            // Invalid opcode
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

        // Get sign bit of immediate
        let signbit:number = (new_num >> 31) & 1;

        let getimm:number = new_num >> 20;
        getimm = getimm & 0xFFF;

        // Handle negative values
        if (signbit === 1) {
            getimm = getimm | ~0xFFF; // Sign-extend the 12-bit immediate to a full 32-bit integer
        }
        
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

        // Get sign bit of immediate
        let signbit:number = (new_num >> 31) & 1;

        // Get immediate
        let getimm:number = new_num >> 20;
        getimm = getimm & 0xFFF;

        // Handle negative values
        if (signbit === 1) {
            getimm = getimm | ~0xFFF; // Sign-extend the 12-bit immediate to a full 32-bit integer
        }

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

        // Get sign bit of immediate
        let signbit:number = (new_num >> 31) & 1;

        // Get immediate
        let getimm:number = new_num >> 20;
        getimm = getimm & 0xFFF;
        
        // Handle negative values
        if (signbit === 1) {
            getimm = getimm | ~0xFFF; // Sign-extend the 12-bit immediate to a full 32-bit integer
        }

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
        let getrs1: number = (new_num >> 15) & 0x1F; 

        // Get rs2
        let getrs2: number = (new_num >> 20) & 0x1F; 
        
        // Get imm[11:5]
        let secondimm: number = (new_num >> 25) & 0x7F; 
        
        // Combine immediate
        let combinedImm: number = (secondimm << 5) | firstimm;

        // Get sign bit of immediate
        let signbit:number = (new_num >> 31) & 1;

        // Handle negative values
        if (signbit === 1) {
            combinedImm = combinedImm | ~0xFFF; // Sign-extend the 12-bit immediate to a full 32-bit integer
        }

        // Get register name and instruction
        let translatedInstruction:string = determineInstruct(getfunct3, type, 0);
        let rs1:string = determineRegister(getrs1);
        let rs2:string = determineRegister(getrs2);
        
        temp = translatedInstruction + " " + rs2 + ", " + combinedImm + "(" + rs1 + ")";
        return temp;
    }

    // Branch instruction
    const SBType = (instruction:string, type:number) => {

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

        // Get sign bit of immediate
        let signbit:number = (new_num >> 31) & 1;

        // Handle negative values
        if (signbit === 1) {
            combinedImm = combinedImm | ~0xFFF; // Sign-extend the 12-bit immediate to a full 32-bit integer
        }
        

        // Get register name and instruction
        let translatedInstruction:string = determineInstruct(getfunct3, type, 0);
        let rs1:string = determineRegister(getrs1);
        let rs2:string = determineRegister(getrs2);
        
        
        temp = translatedInstruction + " " + rs1 + ", " + rs2 + ", " + combinedImm;
        return temp;
    }

    // U-Type Load Upper Immediate (LUI)
    const UTypeLUI = (instruction:string) => {

        let new_num = +instruction;
        let temp: string = "";

        // Get rd
        let getRD:number = new_num >> 7
        getRD = getRD & 0x1F;

        let imm: number = (new_num >> 12) & 0xFFFFF

        // Get sign bit of immediate
        let signbit:number = (new_num >> 31) & 1;

        // Handle negative values
        if (signbit === 1) {
            imm = imm | ~0xFFFFF; // Sign-extend the 12-bit immediate to a full 32-bit integer
        }
        

        let rd:string = determineRegister(getRD);

        temp = "lui " + rd + ", " + imm;
        return temp;
    }

    // U-type Add Upper Immediate to PC
    const UTypeAUPIC = (instruction:string) => {

        let new_num = +instruction;
        let temp: string = "";

        // Get rd
        let getRD:number = new_num >> 7
        getRD = getRD & 0x1F;

        let imm: number = (new_num >> 12) & 0xFFFFF

        // Get sign bit of immediate
        let signbit:number = (new_num >> 31) & 1;

        // Handle negative values
        if (signbit === 1) {
            imm = imm | ~0xFFFFF; // Sign-extend the 12-bit immediate to a full 32-bit integer
        }
                
        let rd:string = determineRegister(getRD);

        temp = "auipc " + rd + ", " + imm;
        return temp;
    }

    // Jump and Link instruction
    const JType = (instruction:string) => {

        let new_num = +instruction;
        let temp: string = "";

        // Get rd
        let getRD:number = new_num >> 7
        getRD = getRD & 0x1F;

        // Extract UJ-type immediate
        let signbit = (new_num >> 31) & 1;        // Bit 20 (Sign Bit)
        let imm2 = (new_num >> 21) & 0x3FF;  // Bits 10-1
        let imm3 = (new_num >> 20) & 0x1;      // Bit 11
        let imm4 = (new_num >> 12) & 0xFF;  // Bits 19-12

        // Assemble the full 21-bit immediate
        let combinedImm: number = (signbit << 20) | (imm2 << 12) | (imm3 << 11) | (imm4 << 1);

        // Sign-extend 21-bit immediate
        if (signbit === 1) {
            combinedImm = combinedImm | ~0x1FFFFF;  // Sign-extend 21-bit immediate
        }

        let rd:string = determineRegister(getRD);
        temp = "jal " + rd + ", " + combinedImm;
        return temp;

    }

    // Input is in binary, 
    if (instruction.startsWith("0b")) {
        instruction = "0x" + convertToHex(instruction);
        opcode = determineOpcode(instruction);
        RISCV_Instruction = determineType(instruction, opcode);
        result = RISCV_Instruction;
    } 
    
    // Input is in hexadecimal
    else if (instruction.startsWith("0x")) {
        opcode = determineOpcode(instruction);
        RISCV_Instruction = determineType(instruction, opcode);
        result = RISCV_Instruction;
    } 
    
    // Input is empty
    else if (!instruction) {
        return ["", ""]
    } 
    
    // Input is formatted incorrectly
    else {
        result = "Invalid input, make sure to put the prefix 0b (binary) or 0x (hexadecimal)";
    }

    // Return converted instruction along with its instruction type
    return [result, instructionType];
}


// Logic to convert a 32-bit RISC-V Instruction into it's encoded hexadecimal number
export const encode = (assembly: string) => {
    
    const RTypes = () => {

    }

    const ITypes = () => {

    }
    
    let splitInstruction: string[] = assembly.split(" ");
    let getValues = findInstruction(splitInstruction[0]);
    let encodedHex:number = 0;

    switch (getValues[3]) {

        case "R":
            RTypes();
            break

        case "I":
            ITypes();
            break;

        default:
            return "Invalid RISC-V instruction"

    }
   

    return encodedHex.toString();
}
