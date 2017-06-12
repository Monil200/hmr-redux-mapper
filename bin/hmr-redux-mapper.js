/** hmr-redux-mapper - v0.1.0 6/12/2017, 5:23:34 PM Copyright (c) 2017 PureCars / Raycom Media - Released under MIT license; */"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}();!function e(t,r,i){function n(o,s){if(!r[o]){if(!t[o]){var u="function"==typeof require&&require;if(!s&&u)return u(o,!0);if(a)return a(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[o]={exports:{}};t[o][0].call(l.exports,function(e){var r=t[o][1][e];return n(r?r:e)},l,l.exports,e,t,r,i)}return r[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)n(i[o]);return n}({1:[function(e,t,r){var i,n=e("fs"),a=e("path"),o=e("lodash"),s=e("js-beautify").js_beautify,u=e("command-line-args"),c=e("command-line-usage"),l=function(e){return e.replace(/\//g,a.sep)},h="index.js",d="redux-mapper.json",p="jpg,jpeg,png,gif",f=/PRM_REDUCER_NAME\s+=\s+['"]([^'"]*)['"]/,g=/PRM_ACTIONS_FOR_REDUCER_NAME\s+=\s+['"]([^'"]*)['"]/,m=/import [^;]* from ['"][^'"]*['"];/gm,_=/import ([^;]*) from ['"]([^'"]*)['"];/m,y=/[^{]*{([^}]*)}/m,R=/require\(([^)]*)\)/gm,v=/require\(([^)]*)\)/m,b=/require\(\s*\[([^\]]*)/m,F=/['"]([^'"]*)['"]/,x=/(.ds_store)/gi,P=/\.test\./g,E={indent_size:2,wrap_line_length:40,brace_style:"expand"},N=[{name:"mainAppPath",alias:"a",type:String,typeLabel:"[underline]{path}",description:'the path to the app\'s main JS/JSX file.  Any reducers used by this JS/JSX file will be considered "global".',mandatory:!0},{name:"basePath",alias:"b",type:String,typeLabel:"[underline]{path}",description:"the path to the root of the project's client-side script JS/JSX files.",mandatory:!0},{name:"containerPaths",alias:"c",type:String,typeLabel:"[underline]{path1},[underline]{path2},...",description:"the root path to a folder containing JS/JSX files which can be a route destination.",mandatory:!0},{name:"coreReducerFilenames",alias:"f",type:String,typeLabel:"[underline]{filename1.js},[underline]{filename2.js},...",description:"if any of these comma-delimited filenames are imported from a folder containing a reducer, then the reducer will be considered to be in use.  If this is not specified, then any action file must contain a [italic]PRM_ACTIONS_FOR_REDUCER_NAME definition to be found."},{name:"disableCache",alias:"d",type:Boolean,defaultValue:!1,description:"(optional) whether to disable the cache, which is useful for debugging."},{name:"globalImportsOutputPath",alias:"g",type:String,typeLabel:"[underline]{path}",description:"the output path for the globalReducerImports.js file.",mandatory:!0},{name:"showHelp",alias:"h",type:Boolean,defaultValue:!1,description:"(optional) show this help message."},{name:"reducerMapOutputPath",alias:"m",type:String,typeLabel:"[underline]{path}",description:"the output path for the reducerMap.js file",mandatory:!0},{name:"reduxPaths",alias:"r",type:String,typeLabel:"[underline]{path1},[underline]{path2},...",description:"(optional) the root path or paths under which all the redux reducers can be found - this may be the same as component path(s)",mandatory:!0},{name:"sagaFilename",alias:"s",type:String,typeLabel:"[underline]{filename}",description:"if you use sagas, this is the filename where all sagas will be contained (e.g., sagas.js)."},{name:"verboseLogging",alias:"v",type:Boolean,defaultValue:!1,description:"(optional) turns on verbose logging (for debugging purposes)"}],O=-1,S=-2,I=-3,A=-4,D=-5,U=-6,M=(i={},_defineProperty(i,O,{errorName:"NO REDUCERS FOUND",troubleShootingTips:["Make sure the base path parameter (-b) is set to the subfolder where your application script files begin (from where package.json is found)","If you place all your reducers in folder tree separate from your UI components, be sure to specify that folder path with the -r parameter",'Be sure all reducer definition files (files which call createReducer, etc.) export a PRM_REDUCER_NAME constant which specifies the name of the reducer state member\r\n(e.g., export PRM_REDUCER_NAME = "myReducer"; if you reference the store using state.myReducer)']}),_defineProperty(i,S,{errorName:"NO REDUCER REFERENCES FOUND",troubleShootingTips:["Make sure you specify the subfolder(s) (from base path) where UI container script files (a container is defined as a UI script file which handles a route URL) using the -c parameter","Make sure you specify all filenames in a folder containing a reducer that, if imported, mean that your container uses the reducer\r\n(e.g., if your reducer actions are defined in an actions.js file, and your reducer state can be read using a fetcher.js file, then specify actions.js,fetcher.js as the -f parameter"]}),_defineProperty(i,I,{errorName:"NO MAIN APPLICATION CONTAINER FOUND",troubleShootingTips:["Make sure you specify the subpath (from base path) to the main UI file for your single-page application using the -a parameter"]}),_defineProperty(i,A,{errorName:"INVALID CONFIGURATION FILE ("+d+")",troubleShootingTips:["The configuration file could not be parsed.  Please check that it is formatted correctly"]}),_defineProperty(i,D,{errorName:"REQUIRED PARAMETER NOT SPECIFIED"}),_defineProperty(i,U,{errorName:"NOT EXECUTED UNDER NODE PATH",troubleShootingTips:["The redux mapper must be executed inside a node path (a package.json file must be found in the execution folder or on of its ancestors)"]}),i),T=function(){function e(){_classCallCheck(this,e),this._opts=u(N).parse(),this._reducers=[],this._cache={},this._totalReducerUsagesFound=0,this._totalFilesScanned=0}return _createClass(e,[{key:"_loadConfigFile",value:function(){var e=this;if(this._existsAndNotAFolder(d)){var t=n.readFileSync(d,"utf8");try{var r=JSON.parse(t);o.each(r.config,function(t,r){"undefined"==typeof e._opts[r]&&(e._opts[r]=r.indexOf("Path")>-1?l(t):t)})}catch(i){this._exitWithError(A)}}}},{key:"_validateParameters",value:function(){var e=this;o.each(N,function(t){t.mandatory&&"undefined"==typeof e._opts[t.name]&&e._exitWithError(D,"-"+t.name,["Specify a value for argument -"+t.name+" either on the command line or in redux-mapper.json"])})}},{key:"_exitWithError",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];t.length&&(t=": "+t),console.log("\r\n*** ERROR: "+M[e].errorName+t+" ***\r\n\r\nTroubleshooting tips:\r\n"),o.each(o.union(M[e].troubleShootingTips||[],r),function(e,t){console.log(t+1+". "+e)}),process.exit(1)}},{key:"_logWithDepth",value:function(e,t){for(var r="",i=0;i<3*(e.length-1);i++)r+=" ";console.log(r+t)}},{key:"_getBasePath",value:function(e){return a.join(this._opts.basePath,e)}},{key:"_execOnAllFilesRecursive",value:function(e,t){var r=this,i=n.readdirSync(e);o.each(i,function(i){i=a.join(e,i),n.statSync(i).isDirectory()?r._execOnAllFilesRecursive(i,t):t(i)})}},{key:"_existsAndNotAFolder",value:function(e){return n.existsSync(e)&&!n.statSync(e).isDirectory()}},{key:"_existsAndIsFolderWithIndex",value:function(e){return n.existsSync(e)&&n.statSync(e).isDirectory()&&n.existsSync(a.join(e,h))}},{key:"_findTrueImportFilePath",value:function(e){return this._existsAndNotAFolder(e)?e:this._existsAndNotAFolder(e+".jsx")?e+".jsx":this._existsAndNotAFolder(e+".js")?e+".js":this._existsAndIsFolderWithIndex(e)?a.join(e,h):null}},{key:"_trimExtension",value:function(e){var t=a.extname(e);return t.length&&(e=e.substr(0,e.lastIndexOf(t))),e}},{key:"_moveToProjectRootFolder",value:function(){for(;!n.existsSync("package.json");){var e=process.cwd();process.chdir(".."),e===process.cwd()&&this._exitWithError(U)}}},{key:"_forceUnixPath",value:function(e){return e.replace(/\\/g,"/")}},{key:"_addToCache",value:function(e,t,r){return this._opts.disableCache||(this._cache[t?e+"_"+t[0]:e]=o.cloneDeep(r)),r}},{key:"_getCache",value:function(e,t){return this._cache[t?e+"_"+t[0]:e]}},{key:"_findReducerDefinitions",value:function(e){var t=this,r=[];return this._execOnAllFilesRecursive(e,function(e){var i=n.readFileSync(e,"utf8"),o=i.match(f);if(o&&o.length>1){var s=o[1],u=e.replace(t._getBasePath(a.dirname(t._opts.reducerMapOutputPath)),"."),c=t._opts.sagaFilename&&e.replace(/\/[^\/]*$/,"/"+t._opts.sagaFilename),l=t._opts.sagaFilename&&n.existsSync(c),h=t._opts.sagaFilename&&c.replace(t._getBasePath(a.dirname(t._opts.reducerMapOutputPath)),".");r.push({reducerName:s,reducerRootPath:a.dirname(e),reducerPath:u,importFunc:"$$function() { return System.import('"+t._forceUnixPath(t._trimExtension(u))+"'); }$$",sagaImportFunc:l?"$$function() { return System.import('"+t._forceUnixPath(t._trimExtension(h))+"'); }$$":void 0})}}),r}},{key:"_isACoreReducerFile",value:function(e,t,r){if(this._opts.coreReducerFilenames){if(0===e.indexOf(r.reducerRootPath)&&e.lastIndexOf(a.sep)===r.reducerRootPath.length){var i=this._opts.coreReducerFilenames.split(",");return o.reduce(i,function(t,r){return t||o.endsWith(e,r)},!1)}}else{var n=t.match(g);if(n&&n.length>1)return n[1]===r.reducerName}return!1}},{key:"_getModuleRestrictionsFromImport",value:function(e,t){if(t&&o.endsWith(e,h)){var r=t[1].match(y);if(r&&r.length>1)return o.map(r[1].split(","),function(e){return o.trim(e.replace(/\n/g,""))})}return null}},{key:"_shouldRestrictThisImport",value:function(e,t,r){var i=this,n=o.map(t[1].split(","),function(e){return o.trim(e.replace(/\n/g,""))});return e&&o.reduce(n,function(n,a){return e.includes(a)||(i._opts.verboseLogging&&(i._logWithDepth(r," +++++++++++++++++++++++++++++++++++++++>>"),i._logWithDepth(r," ++++ ignoring import not in module list: "+t[2]),i._logWithDepth(r," +++++++++++++++++++++++++++++++++++++++>>")),n=!0),n},!1)?null:t[2]}},{key:"_sortAndMapReducers",value:function(e){return o.sortBy(o.map(e,function(e){return e}),"reducerName")}},{key:"_scanForReducerUsageInFile",value:function(e,t,r){var i=this,s=o.isArray(t)?o.clone(t):[];if(s.push(e),this._opts.verboseLogging&&this._logWithDepth(s,"_scanForReducerUsageInFile: "+e),e=this._findTrueImportFilePath(e)){var u=this._getCache(e,r);if(u)return u;var c=void 0;try{c=n.readFileSync(e,"utf8")}catch(l){if(l.message.indexOf("ENOTDIR")===-1&&l.message.indexOf("ENOENT")===-1)throw l;return this._addToCache(e,r,{})}this._totalFilesScanned++;var h=o.reduce(this._reducers,function(t,r){return!i._isACoreReducerFile(e,c,r)||i._globalReducers&&i._globalReducers[r.reducerName]||(i._opts.verboseLogging&&(i._logWithDepth(s," +++++++++++++++++++++++++>>"),i._logWithDepth(s," ++++ found reducer usage: "+r.reducerName),i._logWithDepth(s," +++++++++++++++++++++++++>>")),t[r.reducerName]=r,i._totalReducerUsagesFound++),t},{}),d=this._getModuleRestrictionsFromImport(e,r),p=function(t,r,n){var o=a.join(a.dirname(e),t),u=s.includes(o)?{}:i._scanForReducerUsageInFile(a.join(a.dirname(e),t),s,r),c=i._getBasePath(t),l=s.includes(c)?{}:i._scanForReducerUsageInFile(i._getBasePath(t),s,r);return Object.assign({},u,l,n)},f=c.match(m),g=c.match(R);return this._addToCache(e,r,o.reduce(o.union(f||[],g||[]),function(e,t){var r=t.match(_);if(r){var n=i._shouldRestrictThisImport(d,r,s);if(n)return p(n,r,e)}else{var a=t.match(b);if(a&&a.length>1){var u=a[1].split(",");return o.reduce(u,function(e,t){var i=t.match(F);if(i&&i.length>1)return p(i[1],r,e)},e)}var c=t.match(v);if(c&&c.length>1)return p(c[1],r,e)}return e},h))}return{}}},{key:"_scanForReducerUsageInFolder",value:function(e){var t=this,r={};return this._execOnAllFilesRecursive(e,function(e){var i=e.replace(t._opts.basePath,"."),n=i.match(x),a=i.match(P),s=o.reduce(p,function(e,t){return e||i.match(t+"$")},!1);n||a||s||(r[i]={importFunc:"$$function() { return System.import('"+t._forceUnixPath(t._trimExtension(i))+"'); }$$",reducers:t._sortAndMapReducers(t._scanForReducerUsageInFile(e))})}),r}},{key:"_stripReducersForOutput",value:function(e){return o.map(e,function(e){return{reducerName:e.reducerName,importFunc:e.importFunc,sagaImportFunc:e.sagaImportFunc}})}},{key:"_exportReducerDataFile",value:function(){var e=this,t={};o.each(this._containerReducers,function(r,i){i=e._forceUnixPath(i),t[i]={importFunc:r.importFunc,reducers:e._stripReducersForOutput(r.reducers)}});var r={global:this._stripReducersForOutput(this._sortAndMapReducers(this._globalReducers)),containerSpecific:t};n.writeFileSync(this._getBasePath(this._opts.reducerMapOutputPath),"/* AUTOGENERATED FILE - DO NOT MODIFY */\r\n/* generated by HMR_ReduxMapper */\r\nmodule.exports = \r\n"+s(JSON.stringify(r).replace(/"\$\$/g,"").replace(/\$\$"/g,""),E)+";")}},{key:"_exportGlobalModulesFile",value:function(){var e=this,t=a.dirname(this._opts.globalImportsOutputPath)+a.sep,r=o.reduce(this._globalReducers,function(r,i){return r+("import "+i.reducerName+' from "'+e._forceUnixPath(i.reducerPath.replace(t,""))+'"\r\n')},""),i=o.reduce(this._globalReducers,function(e,t){return e+("  "+t.reducerName+",\r\n")},"");n.writeFileSync(this._getBasePath(this._opts.globalImportsOutputPath),"/* AUTOGENERATED FILE - DO NOT MODIFY */\r\n/* generated by HMR_ReduxMapper */\r\n"+r+"\r\nexport default {\r\n"+i+"};\r\n")}},{key:"_showHelp",value:function(){var e=[{header:"HMR_ReduxMapper",content:"This is a module which generates a [italic]{global} and [italic]{component specific} mapping file which should eliminate the need to manually list all reducers needed to render a given route when using hot-module-reloading.   To use this, each redux reducer file should contain a [bold]{PRM_REDUCER_NAME} constant which this tool will look for."},{header:"Options",optionList:N}],t=c(e);console.log(t)}},{key:"execute",value:function(){var e=this;if(this._opts.showHelp)return this._showHelp();var t=(new Date).getTime();console.log("HMR_ReduxMapper"),console.log("(c)2017 PureCars/Raycom Media - distributed under MIT license"),console.log("Use -h argument for a full list of command line options"),this._moveToProjectRootFolder(),this._loadConfigFile(),this._validateParameters();var r=this._opts.containerPaths.split(","),i=this._opts.reduxPaths.split(",");console.log(""),o.each(i,function(t){t=e._getBasePath(o.trim(t)),console.log("Finding reducers in "+t+" ..."),e._reducers=o.union(e._findReducerDefinitions(t),e._reducers)}),this._opts.verboseLogging&&(console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"),console.log("reducers found:",this._reducers),console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")),this._reducers.length||this._exitWithError(O),this._existsAndNotAFolder(this._getBasePath(this._opts.mainAppPath))||this._exitWithError(I,this._getBasePath(this._opts.mainAppPath)),console.log("Finding global reducers in "+this._getBasePath(this._opts.mainAppPath)+" ..."),this._globalReducers=this._scanForReducerUsageInFile(this._getBasePath(this._opts.mainAppPath)),this._opts.verboseLogging&&(console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"),console.log("global reducers:",this._globalReducers),console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")),this._cache={},this._containerReducers={},o.each(r,function(t){t=e._getBasePath(o.trim(t)),console.log("Scanning reducer usage in "+t+" ..."),e._containerReducers=Object.assign({},e._containerReducers,e._scanForReducerUsageInFolder(t))}),this._totalReducerUsagesFound||this._exitWithError(S),this._exportGlobalModulesFile(),this._exportReducerDataFile();var n=(new Date).getTime();console.log("\r\nSUCCESS!  Found "+this._totalReducerUsagesFound+" reducers used in "+this._totalFilesScanned+" files.  Elapsed time: "+(n-t)+"ms")}}]),e}(),w=new T;w.execute()},{"command-line-args":void 0,"command-line-usage":void 0,fs:void 0,"js-beautify":void 0,lodash:void 0,path:void 0}]},{},[1]);