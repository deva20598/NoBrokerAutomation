const pretty_format = `--format-options '{"theme":{"feature keyword":["magenta","bold"],"scenario keyword":["magenta","bold"], "scenario name":["bold"], "step keyword":["bold","magenta"], "step message": ["grey"], "tag":["green"]}}'`

let tag_name;
let run_type;
let reportName;
let timeStamp = '_' + new Date().toISOString().replaceAll(':','_').replaceAll('.', '_')

try {

     run_type = process.argv[3]; 
     tag_name = process.argv[4];

     if(run_type == 'feature'){
          reportName = tag_name.match(/[^/]*/g)[4].match(/[^.]*/)[0];
          reportName = reportName  +  timeStamp;
          process.env.reportName = reportName;
          console.log(reportName)
     }

     else if( run_type == 'all'){
          reportName = 'all'  +  timeStamp;
          process.env.reportName = reportName;
     }
     else if( run_type == 'tags') {
          let tags = tag_name.split(",");

          if(Array.isArray(tags)){
               tag_name = ''
               for(let i=0;i<tags.length;i++){
                    tag_name = tag_name + " @" + tags[i] + " or "
               }
               tag_name = tag_name.slice(0,-4)
          }
          else
               tag_name = "@" +tag_name

          reportName = tag_name.replace(" or ",'').replaceAll(' ','');
          reportName = reportName +  timeStamp;
          console.log(reportName)
          process.env.reportName = reportName;
     }

} catch {
     console.log("there is some error in arguments")
}

module.exports = {
     tags: `--publish-quiet features/**/*.feature --tags "${tag_name}" -f json:report/${reportName}_json.json -f  @cucumber/pretty-formatter  --require cucumber.conf.js --require step-definitions ${pretty_format}` ,
     feature: `--publish-quiet ${tag_name} -f json:report/${reportName}_json.json -f  @cucumber/pretty-formatter  --require cucumber.conf.js --require step-definitions ${pretty_format}` ,
     all: `--publish-quiet features/**/*.feature --tags "not @wip and not @obsolete" -f json:report/${reportName}_json.json -f  @cucumber/pretty-formatter  --require cucumber.conf.js --require step-definitions ${pretty_format}` 
     } 