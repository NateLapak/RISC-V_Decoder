"use client"; // This is a client component 👈🏽

const Header = () => {

  return (
    <header className="bg-black text-xl py-6 px-8 text-white">
      <div className="flex justify-between items-center">
        <h1>         32-bit RISC-V Instruction Converter       </h1>
        <h1>
          <a 
            href="https://www.cs.sfu.ca/~ashriram/Courses/CS295/assets/notebooks/RISCV/RISCV_CARD.pdf"
            className="text-white hover:underline"
          >
            RISC-V Open Source Reference Sheet   
          </a>
        </h1>
      </div>
    </header>
  )
}

export default Header