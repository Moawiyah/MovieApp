let ar;

fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        ar = data
        // console.log(ar);
    })
    .catch(error => {
        console.error(error);
    });


export const getApi =  ()=>{
    
    return ar;
}