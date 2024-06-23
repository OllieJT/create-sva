import fs from 'fs-extra';
import path from 'path';
import { type PackageJson } from 'type-fest';
import { fileURLToPath } from 'url';

// With the move to TSUP as a build tool, this keeps path routes in other files (installers, loaders, etc) in check more easily.
// Path is in relation to a single index.js file inside ./dist
const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, '../');

//export const PKG_ROOT = path.dirname(require.main.filename);

export const TITLE_TEXT = `
   ******   *******    ********      **      **********  ********
  **////** /**////**  /**/////      ****    /////**///  /**/////
 **    //  /**   /**  /**          **//**       /**     /**
/**        /*******   /*******    **  //**      /**     /*******
/**        /**///**   /**////    **********     /**     /**////
//**    ** /**  //**  /**       /**//////**     /**     /**
 //******  /**   //** /******** /**     /**     /**     /********
  //////   //     //  ////////  //      //      //      ////////

  ********  **      **      **      *******   *******
 **//////  /**     /**     ****    /**////** /**////**
/**        /**     /**    **//**   /**   /** /**   /**
/********* //**    **    **  //**  /*******  /*******
////////**  //**  **    ********** /**////   /**////
       /**   //****    /**//////** /**       /**
 ********     //**     /**     /** /**       /**
////////       //      //      //  //        //

`;
export const DEFAULT_APP_NAME = 'new-svelte-app';

export const CLI_NAME = 'create-svapp';
export const CLI_DESCRIPTION = 'A CLI for creating web applications with SvelteKit';
export const CLI_VERSION = get_svapp_version();

function get_svapp_version() {
	const package_json_path = path.join(PKG_ROOT, 'package.json');
	const package_json_content = fs.readJSONSync(package_json_path) as PackageJson;
	return package_json_content.version ?? '1.0.0';
}
