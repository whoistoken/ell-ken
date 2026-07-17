async function askAI(message){

    const response = await fetch(
        CONFIG.API_URL,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json",

                "Authorization":
                "Bearer " + CONFIG.API_KEY
            },


            body:JSON.stringify({

                model:CONFIG.MODEL,

                messages:[

                    {
                        role:"system",

                        content:
                        "Kamu adalah Ell Ken AI, asisten pintar yang membantu pengguna dengan jawaban yang jelas, ramah, dan informatif."
                    },


                    {
                        role:"user",

                        content:message
                    }

                ],


                temperature:0.7,

                max_tokens:1000

            })

        }
    );



    if(!response.ok){

        throw new Error(
            "API Error: "+response.status
        );

    }



    const data = await response.json();



    return data
    .choices[0]
    .message
    .content;


}
