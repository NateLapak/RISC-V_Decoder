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
import findRegister from "./findRegister";

// This function handles the functionalitny and logic for converting a binary or hexadecimal number into it's RISC-V instruction
export const decode = (instruction: string) => {

    let result:string = "";

    let opcode:string = "";
    let RISCV_Instruction:string = "";
    let instructionType: string = "None";

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
            System instructions = 0
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

            // System instructions 
            case "1110011":
                new_instruction = SysInstructions(instruction, 0)
                instructionType = "I-Type"
                break

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
        let getRD: number = (new_num >> 7) & 0x1F;

        // Get funct3
        let getfunct3: number = (new_num >> 12) & 0x7;

        // Get rs1
        let getrs1: number = (new_num >> 15) & 0x1F;

        // Get sign bit of immediate
        let signbit: number = (new_num >> 31) & 1;

        // Get immediate (default extraction)
        let getimm: number = (new_num >> 20) & 0xFFF;

        // Check if instruction is shift immediate (SLLI, SRLI, SRAI)
        let funct7: number = 0; 
        if (getfunct3 === 0b001 || getfunct3 === 0b101) {  
            funct7 = (new_num >> 25) & 0x7F;  // Extract funct7 from bits 31:25
            getimm = (new_num >> 20) & 0x3F;  // Extract shift amount (shamt), only 6 bits
        }

        // Handle negative values (only for non-shift instructions)
        if (signbit === 1 && (getfunct3 !== 0b001 && getfunct3 !== 0b101)) {
            getimm = getimm | ~0xFFF; // Sign-extend 12-bit immediate to 32-bit
        }
                
        let rd:string = determineRegister(getRD);
        let translatedInstruction:string = determineInstruct(getfunct3, type, funct7);
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
            getimm -= 1
        }

        let rd:string = determineRegister(getRD);
        let translatedInstruction:string = determineInstruct(getfunct3, type, 0);
        let rs1:string = determineRegister(getrs1);
        let imm:string = getimm.toString();

        temp = translatedInstruction + " " + rd + ", " + imm + "(" + rs1 + ")";
        return temp;
    }

    // System instructions
    const SysInstructions = (instruction:string, type:number) => {

        let new_num = +instruction;
        let temp: string = "";


        // Get funct3
        let getfunct3: number = (new_num >> 12) & 0x7;

        // Get rs1
        let getrs1: number = (new_num >> 15) & 0x1F;

        // Get rd
        let getRD: number = (new_num >> 7) & 0x1F;

        // Get immediate (imm[11:0])
        let getimm: number = (new_num >> 20) & 0xFFF;

        // **Special Case: ECALL and EBREAK (funct3 = 000)**
        if (getfunct3 === 0b000) {
            if (getimm === 0x000) {
                return "ecall";
            } else if (getimm === 0x001) {
                return "ebreak";
            }
        }

        let rd:string = determineRegister(getRD);
        let translatedInstruction:string = determineInstruct(getfunct3, type, 0);
        let csr:string = determineRegister(getimm);

        if (getfunct3 == 5 || getfunct3 == 6 || getfunct3 == 7) {
            temp = translatedInstruction + " " + rd + ", " + csr + ", " + getrs1
        }

        else {
            let rs1:string = determineRegister(getrs1);
            temp = translatedInstruction + " " + rd + ", " + csr + ", " + rs1 
        }

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
            combinedImm -= 1
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
            combinedImm -= 1;
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
            imm -= 1
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
            imm -= 1
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
        let getRD: number = (new_num >> 7) & 0x1F; // Bits 11-7
        
        // Correctly extract UJ-type immediate
        let signbit = (new_num >> 31) & 1;  
        let imm_10_1 = (new_num >> 21) & 0x3FF; 
        let imm_11 = (new_num >> 20) & 0x1; 
        let imm_19_12 = (new_num >> 12) & 0xFF; 
        
        // Assemble the full 21-bit immediate
        let combinedImm: number = (signbit << 20) | (imm_19_12 << 12) | (imm_11 << 11) | (imm_10_1 << 1);
        
        // Sign-extend 21-bit immediate
        if (signbit === 1) {
            combinedImm = combinedImm | ~0x1FFFFF;  // Proper sign extension for 21-bit
            combinedImm -= 1
        }
        
        let rd: string = determineRegister(getRD);
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

    let splitInstruction: string[] = assembly.trim().split(" ");
    let getValues = findInstruction(splitInstruction[0]);
    let encodedHex:string = "Invalid RISC-V instruction"

    // Encoding time
    switch (getValues[3]) {

        // R-type instruction
        case "R-Type": {

            // Extract values from most significant bit to least significant bit
            let funct7:any = getValues[2]
            let rs2:number = findRegister(splitInstruction[3])
            let rs1:number = findRegister(splitInstruction[2].slice(0, -1))
            let funct3:any = getValues[1]
            let rd:number = findRegister(splitInstruction[1].slice(0, -1))
            let opcode:any = getValues[0]
                        
            // Forms the equivalent hex number, convert it to hexadecimal and ensure 8 hexadecimal characters are printed.
            let formHex = ((funct7 << 25) | (rs2 << 20) | (rs1 << 15) | (funct3 << 12) | (rd << 7) | opcode).toString(16).padStart(8, '0')
            encodedHex = "0x" + formHex
            break
        }

        // I-type instruction
        case "I-Type": {

            // I-type arithmetic instructions
            if (getValues[0] == 0b0010011) {

               // Extract values from most significant bit to least significant bit
                let imm: number = parseInt(splitInstruction[3]);
                let rs1: number = findRegister(splitInstruction[2].slice(0, -1));
                let funct3: any = getValues[1];
                let rd: number = findRegister(splitInstruction[1].slice(0, -1));
                let opcode: any = getValues[0];

                let funct7: number = 0; // Default funct7

                // Special handling for SRAI
                if (funct3 === 0b101 && splitInstruction[0] === "srai") {
                    funct7 = 0b0100000; // SRAI's funct7
                }

                // Sign-extend the immediate (assuming it's 12-bit)
                imm = imm & 0xFFF; // Mask to 12 bits
                if (imm & 0x800) {  // If the 12th bit is set, extend the sign
                    imm |= 0xFFFFF000; // Extend to 32 bits
                }

                
                // Combine all parts to form hexadecimal representation, convert it to hexadecimal and ensure 8 hexadecimal characters are printed.
                let formHex: string = (((funct7 << 25) | (imm << 20) | (rs1 << 15) | (funct3 << 12) | (rd << 7) | opcode) >>> 0 )
                    .toString(16)
                    .padStart(8, '0');
                encodedHex = "0x" + formHex;
                break;


            }

            // System instructions
            else if (getValues[0] == 0b1110011) {

                if (splitInstruction[0] == "ecall") {
                    encodedHex = "0x00000073"
                    break
                }

                else if (splitInstruction[0] == "ebreak") {
                    encodedHex = "0x00100073"
                    break
                }


                
            }

            // I-type load instructions and jump (jalr)
            else {

                let seperate:any = 0
                let imm:number = 0;
                let rs1:number = 0;
                try {
                    seperate = splitInstruction[2].match(/(-?\d+)\((\w+)\)/)
                    imm = parseInt(seperate[1]);
                    rs1 = findRegister(seperate[2])
                }

                catch(e) {
                    return "Error"
                }
                
                let funct3:any = getValues[1]
                let rd:number = findRegister(splitInstruction[1].slice(0, -1))
                let opcode:any = getValues[0]

                let formHex: string = ((imm << 20) | (rs1 << 15) |  (funct3 << 12) |  (rd << 7) | opcode).toString(16).padStart(8, '0')
                encodedHex = "0x" + formHex
                break
            }
        }

        // S-type instruction
        case "S-Type": {

            let seperate:any = 0;

            try {
                seperate = splitInstruction[2].match(/(-?\d+)\((\w+)\)/)
            }

            catch(e) {
                break
            }


            // Extract values from most significant bit to least significant bit
            let imm:number = parseInt(seperate[1]);
            let rs1:number = findRegister(seperate[2])
            let rs2:number = findRegister(splitInstruction[1].slice(0, -1));
            let funct3:any = getValues[1]
            let opcode:any = getValues[0]

            // Split immediate
            let highImm = (imm >> 5) & 0b1111111;
            let lowImm = imm & 0b11111

            
            // Sign-extend the immediate (assuming it's 12-bit)
            imm = imm & 0xFFF; // Mask to 12 bits
            if (imm & 0x800) {  // If the 12th bit is set, extend the sign
                imm |= 0xFFFFF000; // Extend to 32 bits
            }

            // Combine all parts to form hexadecimal representation, convert it to hexadecimal and ensure 8 hexadecimal characters are printed.
            let formHex: string = (((highImm << 25) | (rs2 << 20) | (rs1 << 15) | (funct3 << 12) | (lowImm << 7) | opcode) >>> 0).toString(16).padStart(8, '0')
            encodedHex = "0x" + formHex
            break;
        }

        // SB-type instructions (branch instructions)
        case "SB-Type": {

            let imm:number = parseInt(splitInstruction[3])
            let rs1:number = findRegister(splitInstruction[2].slice(0, -1))
            let funct3:any = getValues[1]
            let rd:number = findRegister(splitInstruction[1].slice(0, -1))
            let opcode:any = getValues[0]

            // Split immediate
            let highImm = (imm >> 5) & 0b1111111;
            let lowImm = imm & 0b11111

            imm = imm & 0xFFF; // Mask to 12 bits
            if (imm & 0x800) {  // If the 12th bit is set, extend the sign
                imm |= 0xFFFFF000; // Extend to 32 bits
            }
            
            // Combine all parts to form hexadecimal representation, convert it to hexadecimal and ensure 8 hexadecimal characters are printed.
            let formHex: string = (((highImm << 25) | (rs1 << 20) | (rd << 15) | (funct3 << 12) | (lowImm << 7) | opcode) >>> 0).toString(16).padStart(8, '0')
            encodedHex = "0x" + formHex
            break;
        }

        // U-type instructions
        case "U-Type": {
            let imm:number = parseInt(splitInstruction[2])
            let rd:number = findRegister(splitInstruction[1].slice(0, -1))
            let opcode:any = getValues[0]

            let formHex:string = ((imm << 12) | (rd << 7) | opcode).toString(16).padStart(8, '0')
            encodedHex = "0x" + formHex
            break
        }

        // Jump and link (JAL) instructions
        case "UJ-Type": {
            
            let imm:number = parseInt(splitInstruction[2])
            let rd:number = findRegister(splitInstruction[1].slice(0, -1))
            let opcode:any = getValues[0]
 
            // Extract immediate into it's different parts
            let imm20 = (imm >> 20) & 0b1;        
            let imm10_1 = (imm >> 1) & 0b1111111111; 
            let imm11 = (imm >> 11) & 0b1;       
            let imm19_12 = (imm >> 12) & 0b11111111; 

            let formHex:string = ((imm20 << 31) | (imm10_1 << 21) | (imm11 << 20) | (imm19_12 << 12) |(rd << 7) | opcode).toString(16).padStart(8, '0')
            encodedHex = "0x" + formHex;
            break
        }

        default:
            encodedHex = "Invalid RISC-V instruction"
            break

    }

    return [encodedHex, getValues[3]]
}
