const got = require('got');

var civFromName = async (civ) => {
    const response1 = await got('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations');
    var civilizations = JSON.parse(response1.body).civilizations;
    for(var i=0;i<civilizations.length;i++){
        if( civilizations[i].name === civ){
            var civilization = civilizations[i]
            var civ_printable = ''
            civ_name = civilization.name
            civ_tech_no = civilization.unique_tech.length
            civ_printable += `${civ_name} have `
            if (civ_tech_no === 0) {civ_printable += 'No unique tech bonus'}
            for(var j=0; j < civ_tech_no; j++) {
                if(j !== 0) { civ_printable += ' and '}
                var civ_unique_tech_url = civilization.unique_tech[j]
                console.log("requesting" + civ_unique_tech_url)
                var response = await got(civ_unique_tech_url);
                var unique_tech = JSON.parse(response.body)
                civ_printable += `${unique_tech.name} that gives bonus of ${unique_tech.description}`          
            }
            return civ_printable  
        } 
    }
}

module.exports = {
    civFromName
}