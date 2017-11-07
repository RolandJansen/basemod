// @flow
/**
 * Flow-type typedefs for  for enb presets.
 */
 export type IniObject = {
   section: string,
   key: string | Array<any>,
   value: any,
   orgValue: any,
   meta?: string
 }

 export type Preset = {
   name: string,
   id: number,
   gameId: number,
   gameName: string,
   enbMinVersion: string,
   enbMaxVersion?: string,
   active: boolean,
   ini?: Array<IniObject>,
   prefs?: Array<IniObject>
 }
