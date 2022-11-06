class VM {
  constructor(vm){
    this.device = {}
    this.device.disk = {
      "1": {
        name: "prim-part",
        contents: {
          "1/bcd": {
            'type': 'file',
            'filename': 'bcd',
            'path': '1/bcd'
          }
        }
      }
    }
    this.bootloader = this.device.disk['1'].contents['bcd']
    this.device.exts = {}
    this.device.display = document.querySelector("div[for=" + vm.id + "]")
    this.device.execute = (lib, cmd, args) => {
      if (args){
        return this.functions[lib][cmd](args.split(" "))
      }else {
        return this.functions[lib][cmd]() 
      }  
    }
    this.functions = {}
    this.functions.fs= {}
    this.functions.gimp = {}
    //
    this.functions.fs.readPart = (args) => {
      return this.device.disk[args[0]]
    }
    //
    this.functions.fs.listPart = () => {
      return this.device.disk
    }
    //
    this.functions.fs.readFile = (args) => {
     if (this.device.disk[args[0].split("/")[0]].contents[args[0]]){
        return this.device.disk[args[0].split("/")[0]].contents[args[0]]
     } else {
      return "File does not exist" 
     }
    }
    //
    this.functions.fs.writeFile = (args) => {
      if (this.device.disk[args[0].split("/")[0]].contents[args[0]]){
        this.device.disk[args[0].split("/")[0]].contents[args[0]].data += "\r\n " + args[1]
      } else {
        if (args[0].split("/").length -  1 > 1){
var carIndex = args[0].split("/").indexOf(args[0].split('/')[args[0].split('/').length]);//get  "car" index
//remove car from the colors array
var folder = args[0].split("/")
folder.splice(carIndex, 1)
          if (this.device.disk[args[0].split("/")[0]].contents[folder.join('/')]){
            if (this.device.disk[args[0].split("/")[0]].contents[folder.join('/')].type == 'folder'){
              this.device.disk[args[0].split("/")[0]].contents[args[0]] = {
               'type': 'file',
               'filename': args[0].split('/')[args[0].split('/').length - 1],
               'path': args[0],
               'data': args[1],
               'created': Date("now")
              }
            } else {
              return "File is not a folder"
            }
          } else {
            return "Folder does not exist"
          }
        } else {
          this.device.disk[args[0].split("/")[0]].contents[args[0]] = {
             'type': 'file',
             'filename': args[0].split('/')[args[0].split('/').length - 1],
             'path': args[0],
             'data': args[1],
             'created': Date("now")
          }
        }
      }
    }
    //
    this.functions.fs.makeDir = (args) => {
      if (!this.device.disk[args[0].split("/")[0]].contents[args[0]]){
        this.device.disk[args[0].split("/")[0]].contents[args[0]] = {
             'type': 'folder',
             'filename': args[0].split('/')[args[0].split('/').length - 1],
             'path': args[0],
             'created': Date("now")
        } 
      } else {
         return "Already exists"
      }
    }
    //
  }
}