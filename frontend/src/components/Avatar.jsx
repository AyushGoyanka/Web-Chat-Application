export default function Avatar({

    name,

    avatar,

    size="normal"

}) {



    const letter =

        avatar

        ?

        avatar

        :

        name?.[0]?.toUpperCase() || "?";





    const sizes = {


        small:
        "w-8 h-8 text-xs",



        normal:
        "w-10 h-10 text-sm",



        large:
        "w-16 h-16 text-2xl"


    };






    return (


<div

className={`
rounded-full

bg-gradient-to-br
from-cyan-400
to-violet-500

flex
items-center
justify-center

font-bold
text-black

${sizes[size]}

`}


>


{letter}



</div>


    );

}