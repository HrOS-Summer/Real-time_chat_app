const AuthImagePattern = ({ title, subtitle }) => {
 

  return (
      // <div className="hidden md:flex flex-1 items-center justify-center px-8 py-12">
      //   <div className="md:max-w-md lg:max-w-xs xl:max-w-md">
      //       {/* Community Grid */}
      //       <div className="grid grid-cols-3 gap-4 mb-8">
      //         {[...Array(9)].map((_, i) => (
      //           <div
      //             key={i}
      //             className={`aspect-square rounded-2xl transition-all duration-300 
      //             ${i % 2 === 0 ? "animate-pulse" : ""}
      //             hover:scale-105 cursor-pointer`}
      //             style={{
      //               background: isDarkMode
      //                 ? `linear-gradient(135deg, 
      //                    ${i % 3 === 0 ? '#4f46e5' : i % 3 === 1 ? '#06b6d4' : '#8b5cf6'}20,
      //                    ${i % 3 === 0 ? '#7c3aed' : i % 3 === 1 ? '#0891b2' : '#6366f1'}30)`
      //                  :`linear-gradient(135deg, 
      //                    ${i % 3 === 0 ? '#e0e7ff' : i % 3 === 1 ? '#cffafe' : '#ede9fe'},
      //                    ${i % 3 === 0 ? '#c7d2fe' : i % 3 === 1 ? '#a5f3fc' : '#ddd6fe'})`
      //             }}
      //           />
      //         ))}
      //       </div>

      //       {/* Community Text */}
      //       <div className="text-center">
      //          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white"> 
      //           {title}
      //         </h2>
      //         <p className="text-sm leading-relaxed text-gray-500">
      //           {subtitle}
      //         </p>
      //       </div>
      //     </div>
      //   </div>
      




    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              aria-hidden="true"
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;