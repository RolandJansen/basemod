// @flow
/**
 * Flow-type typedefs for  for enb presets.
 */
type timestamp = number

 export type IniObject = {
   section: string,
   key: string | Array<any>,
   value: any,
   orgValue: any,
   meta?: string
 }

 export type Preset = {
   // async props
   isSelected: boolean,
   isInstalled: boolean,
   isFetching: boolean,
   lastUpdated: timestamp,
   // static props
   name: string,
   id: number,
   fileId: number,
   gameId: number,
   gameName: string,
   enbMinVersion: string,
   enbMaxVersion?: string,
   ini?: Array<IniObject>,
   prefs?: Array<IniObject>
 }
