"use client";
import { useState } from "react";
import {decode, encode} from "./convert"


const Home = () => {
    const [instruction, setInstruction] = useState("");
    const [instructionType, setInstructionType] = useState("");
    const [result, setResult] = useState("");
    const [mode, setMode] = useState("decode"); 
    const [hasConverted, setHasConverted] = useState(false); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInstruction(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent page reload

        if (mode === "decode") {
            const output = decode(instruction); // Decode instruction
            setResult(output[0]);
            setInstructionType(output[1]);
        } else if (mode === "encode") {
            const output = encode(instruction); // Encode RISC-V assembly
            setResult(output);
            setInstructionType("");
        }

    };

    return (
        <div className="container-fluid py-4">
            <div className="homepage my-8">
                <h2>RISC-V Instruction {mode === "decode" ? "Decoder" : "Encoder"}</h2>
                <p>
                    {mode === "decode" 
                    ? "Convert a number in binary or hexadecimal to its 32-bit RISC-V assembly instruction" 
                    : "Convert a 32-bit RISC-V assembly instruction into it's hexadecimal representation"}
                </p>
                <div>
                    <form className="home-form w-full max-w-lg" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="mb-6 block uppercase tracking-wide text-[#ADD9F4] text-xs font-bold mb-2">
                                    {mode === "decode" 
                                    ? "Enter a binary (0b) or hexadecimal number (0x):" 
                                    : "Enter a 32-bit RISC-V Assembly Instruction:"}
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    placeholder={mode === "decode" 
                                        ? "0b10101010 or 0x00128293" 
                                        : "e.g., addi t0, t2, 1"}
                                    value={instruction}
                                    onChange={handleChange}
                                />
                                <p className="text-[#476C9B] text-xs italic">
                                    {mode === "decode" 
                                        ? "Works only for 32-bit RISC-V Assembly" 
                                        : "Convert RISC-V Assembly to Hexadecimal"}
                                </p>
                            </div>
                        </div>

                        <button type="submit" className="bg-[#476C9B] hover:bg-[#ADD9F4] text-white font-bold py-2 px-4 mx-8 rounded" 
                            onClick={() => {
                            setHasConverted(true); // Prevent result display before clicking Convert
                        }}>
                            Convert
                        </button>

                        <button className="bg-[#476C9B] hover:bg-[#ADD9F4] text-white font-bold py-2 my-6 px-4 rounded mb-4 mx-8"
                            onClick={() => {
                                setMode(mode === "decode" ? "encode" : "decode")
                                setResult("");      // Clear result
                                setInstruction(""); // Clear instruction to prevent stale input
                                setInstructionType("None"); // Reset instruction type to avoid unexpected display
                                setHasConverted(false);
                            }}>
                            Switch to {mode === "decode" ? "Encoder" : "Decoder"}
                        </button>
                        
                    </form>
                </div>

                 {/* ✅ Display the result below the form */}
                 {result && hasConverted && instruction && (
                    <div className="mt-4 p-4 bg-[#476C9B] border-[#476C9B] rounded">
                        
                    {mode === "decode" ? (
                        <>
                            <h3 className="text-lg text-[#101419]"><b>Hexadecimal or Binary number:</b> {instruction} </h3>
                            <h3 className="text-lg text-[#101419]"><b>Instruction Type:</b> {instructionType}</h3>
                            <h3 className="text-lg text-[#101419]"><b>RISC-V Instruction:</b> {result}</h3>
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg text-[#101419]"><b>RISC-V Instruction:</b> {instruction}</h3>
                            <h3 className="text-lg text-[#101419]"><b>Encoded Hexadecimal:</b> {result}</h3>
                        </>
                    )}
                    </div>
                )}

                <h4>Examples of I/O in Hexadecimal and Binary. </h4>
                <p>
                    <br/>
                    0x00128293 --- addi t0, t0, 1
                    <br/>
                    0x41de0f33 --- sub t5, t3, t4
                    <br/>
                    0x008ea023 --- sw s0, 0(t4)
                    <br/>
                    0x00c007ef --- jal a5, 12
                    <br/>
                    0x0c44ea37 --- lui s4, 50254
                    <br/>
                    <br/>
                    0b00000000010010100010111000000011 --- lw t3, 4(s4)
                    <br/>
                    0b00000000000111110111001010110011 --- and t0, t5, ra
                    <br/>
                    0b00000000100011110000010001100111 --- jalr s0, 8(t5)
                    <br/>
                    0b00000001111000101101011001100011 --- bge t0, t5, 12
                    <br/>
                    0b00000101010101000100101110010111 --- auipc s7, 21828
                </p>

                <h6 className="text-xl">Here are some of the examples translated into Python for reference</h6>
                <p>
                    addi t0, t0, 1 --- t0 = t0 + 1
                    <br/>
                    sub t5, t3, t4 --- t5 = t3 - t4
                    <br/>
                    and t0, t5, ra --- t0 = t5 & ra
                </p>
                
                {/* <p>Click here if you want to translate a RISC-V Instruction into it's Hexadecimal or Binary number</p>
                <button type="submit" className="bg-[#476C9B] hover:bg-[#ADD9F4] text-white font-bold py-2 px-4 rounded">
                    Encoder
                </button> */}

                <h4 className="mb-4">RISC-V Background</h4>
                <p>
                    RISC-V is an instruction set architecture (ISA) developed at the University of California, Berkeley. Compared to other ISAs like x86 or ARM, RISC-V is open-source and excellent
                    <br />
                    for an introductory course in computer architecture. This website was made to help decode the binary representation of RISC-V instructions, help other
                    <br />
                    university students gain a better understanding of RISC-V assembly, and as a fun personal project I started during reading week.
                    <br />
                    <br />
                    For more information, visit the official RISC-V GitHub page or the University of California, Berkeley project description.
                </p>
            </div>
        </div>
    );
};

export default Home;
