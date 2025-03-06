# RISC-V Decoder Website
This website converts a hexadecimal or binary number into a RISC-V Assembly instruction.

## Algorithm to decode instruction
Here is the algorithm I used to convert a binary or hex number to its RISC-V Instruction

    1. Extract binary or hex number inputted by user
    2. Determine opcode by extracting the lowest 6 bits of the 32-bit instruction
    3. Using the opcode, determine the instruction type (I-Type, R-Type, S-type, etc)
    4. Determine mnemonic of instruction by using funct3 and funct7 of instruction
    5. Translate decimal representation of registers to register name
    6. If instruction uses an immediate, combine parts to form the full immediate
    7. If immediate is negative, use Two's complement to convert
    8. Return resulting RISC-V Instruction and output it to user


## Algorithm to encode instruction
Here is the algorithm I used to convert a RISC-V instruction into its hexadecimal number

    1. Extract RISC-V Instruction inputted by user
    2. Split user input into 3 parts: The mnemonic, the registers, and the immediate (if applicable)
    2. Using the instruction's mnemonic, determine its opcode, funct3 and funct7.
    3. Translate the register name to its decimal representation
    4. Convert the immediate of instruction to binary
    5. If immediate is negative, use two's complement.
    6. Combine the opcode, funct3, funct7, registers, and immediate into 8 hexadecimal characters.
    7. Return resulting hexadecimal number and output it to user

## Tech stack
Here is a list of programming languages and technolgies used



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
