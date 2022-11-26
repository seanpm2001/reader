import {VIADefinitionV2} from './types.v2';
import {VIADefinitionV3} from './types.v3';

export type Rotation = {
  r: number;
  rx: number;
  ry: number;
};

export type KLEDimensions = Rotation & {
  a: number;
  x: number;
  w: number;
  h: number;
  y: number;
};

export type OptionalDimensions = Partial<{
  x2: number;
  y2: number;
  h2: number;
  w2: number;
}>;

export type Decal = {
  d: boolean;
};

export type OtherKLEProps = {[key: string]: any};

export type KeyColor = string;
export type LegendColor = string;

export type MatrixPosition = {row: number; col: number; ei?: number};

export type Cursor = {x: number; y: number};
export type Formatting = {c: KeyColor; t: LegendColor};
export type Dimensions = {
  w: number;
  h: number;
};
export type KLEElem =
  | (KLEDimensions & Formatting & Decal & OptionalDimensions)
  | OtherKLEProps
  | string;
export type ColorCount = {[key: string]: number};
export type ParsedKLE = {
  res: Result[][];
  colorMap: {[k: string]: string};
};

export type GroupMeta = {
  group: {
    key: number;
    option: number;
  };
};

export type ThemeDefinition = {
  [key in KeyColorType]: Formatting;
};

export type Result = {h: number; w: number} & Formatting &
  Dimensions &
  OptionalDimensions &
  Cursor &
  Rotation &
  MatrixPosition &
  Decal &
  GroupMeta;

export type VIAKey = Omit<Result, keyof Formatting | 'group' | 'd'> & {
  color: KeyColorType;
};

export enum KeycodeType {
  QMK = 'qmk',
  WT = 'wt',
  None = 'none',
}

export enum KeyColorType {
  Alpha = 'alpha',
  Mod = 'mod',
  Accent = 'accent',
}

export type KLEFormattingObject = Partial<{
  c: string;
  t: string;
  x: number;
  y: number;
  w: number;
  a: number;
}>;

export type KLEMeta = {
  name?: string;
};

export type KLELayoutDefinition = (
  | KLEMeta
  | (string | KLEFormattingObject)[]
)[];

export type KLELayout = (KLEMeta | KLEElem[])[];

export type MatrixInfo = {
  rows: number;
  cols: number;
};

/* This specifically does not include code */
export type CustomKeycode = {
  name: string;
  title: string;
  shortName?: string;
};

export type LayoutLabel = string | string[];

export type VIALayout = {
  width: number;
  height: number;
  keys: VIAKey[];
  optionKeys: {[g: string]: {[o: string]: VIAKey[]}};
};

export type DefinitionVersionMap = {v2: VIADefinitionV2; v3: VIADefinitionV3};
export type KeyboardDictionary = Record<string, DefinitionVersionMap>;

export type DefinitionVersion =
  keyof KeyboardDictionary[keyof KeyboardDictionary];

export type KeyboardDefinitionIndex = {
  generatedAt: number;
  version: string;
  theme: ThemeDefinition;
  vendorProductIds: {[key in DefinitionVersion]: number[]};
  // The idea here is that anything in 'v2' will have both v2 and v3 defs
  // so 'v3' only contains defs that aren't v2
};