class VM {
  constructor(vm){
    this.device = {}
    this.device.disk = {
      "1": {
        name: "prim-part",
        contents: {}
      }
    }
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
    this.functions.fs.readPart = (args) => {
      return this.device.disk[args[0]]
    }
    this.functions.fs.listPart = () => {
      return this.device.disk
    }
    this.functions.fs.readFile = (args) => {
      return this.device.disk[args[0].split("/")[0]].contents[]
    }
  }
}