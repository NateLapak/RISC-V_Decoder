const Home = () => {
    return (
        <div className='container-fluid col-lg-10 col-md-10 col-sm-10 col-xs-10 h-screen'>
            
            <div className="homepage m-auto">

                <h2>RISC-V Instruction Decoder</h2>
                <p>Convert a number in binary or hexadecimal to it's RISC-V assembly instruction.</p>
                <form className="home-form w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Enter a binary (0b) or hexadecimal number (0x):
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="instruction" type="text" placeholder="0b1010 or 0x00128293"/>
                            <p className="text-gray-600 text-xs italic">Works only for 32-bit RISC-V Assembly</p>
                        </div>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Convert
                    </button>
                </form>


                <h4>RISC-V Background</h4>
                <p>
                    RISC-V is an instruction set architecture (ISA) developed at the University of California, Berkeley. Compared to other ISAs like x86 or ARM, RISC-V is open-source and excellent
                    <br/>
                    for an introductory course in computer architecture. This website was made to help decode the binary representation of RISC-V instructions, help other
                    <br/>
                    university students gain a better understanding of RISC-V assembly, and as a fun personal project I made during reading week.
                    <br/>
                    <br/>
                    For more information, visit the official RISC-V github page or the University of California, Berkley project description.

                </p>

            </div>

        </div>
    )
}

export default Home