import 'whatwg-fetch';

export const fetchService = (options) => {
    const dev = NODE_ENV == 'development' ? true:false;
    let fullUrl = dev ? 'http://localhost'+options.url : options.url;

    const fetchOpts = {
        method: options.type,
        credentials: 'include',
    };
    if(options.customData) {
        fetchOpts.body = options.data
    } else if(options.data) {
        let formData  = new FormData();
        Object.keys(options.data).map((key)=>{
            if(key=='files') {
                for (let i = 0; i <= options.data[key].length - 1; i++) {
                    formData.append('files[]', options.data[key][i]);
                }
            }
               else if(Array.isArray(options.data[key])) {
                    for(let i=0; i<=options.data[key].length-1;i++) {
                        formData.append('files[]', options.data[key][i]);
                    }
            } else if(options.data[key] !== null) {
                formData.append(key, options.data[key]);
            }
            return null;
        });
        fetchOpts.body = formData;
    }
    fetch(fullUrl,fetchOpts)
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            options.success(jsonData);
        })
        .catch((error) => {
            //для дев компонента
            if (typeof window !== 'undefined' && window.store && window.store.dispatch) {
                window.store.dispatch({type: 'ADD_MESSAGE', text: error.message})
            }
            console.log(error.message);
            console.log(error.fileName);
            console.log(error.lineNumber);
        });
};

export const fetchServiceJson = (options) => {

/*eslint no-undef:0*/
    let fullUrl = NODE_ENV === 'development' ? 'http://admin.trivaster'+options.url : options.url;

    const fetchOpts = {
        method: options.type,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options.data)
    };


    fetch(fullUrl,fetchOpts)
        .then(response=>response.json())
        .then(json => {
            options.success(json);
        }).catch((error) => {
        //для дев компонента
        console.log(error.message);
        console.log(error.lineNumber);
    });
};
