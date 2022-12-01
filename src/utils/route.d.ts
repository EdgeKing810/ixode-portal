export interface IBodyData {
  id: string;
  bdtype: string;
}

export interface IParamData {
  delimiter: string;
  pairs: Array<IBodyData>;
}

export interface IAuthJWT {
  active: boolean;
  field: string;
  ref_col: string;
}

export interface IRoute {
  route_id: string;
  route_path: string;
  project_id: string;
  auth_jwt: IAuthJWT | null;
  body: Array<IBodyData>;
  params: IParamData | null;
  flow: IFlow;
}

export interface IFlow {
  fetchers: Array<IFetchBlock>;
  assignments: Array<IAssignmentBlock>;
  templates: Array<ITemplateBlock>;
  conditions: Array<IConditionBlock>;
  loops: Array<ILoopBlock>;
  filters: Array<IFilterBlock>;
  properties: Array<IPropertyBlock>;
  functions: Array<IFunctionBlock>;
  objects: Array<IObjectBlock>;
  updates: Array<IUpdateBlock>;
  creates: Array<ICreateBlock>;
  returns: Array<IReturnBlock>;
}

export interface IFetchBlock {
  global_index: number;
  block_index: number;
  local_name: string;
  ref_col: string;
}

export interface IAssignmentBlock {
  global_index: number;
  block_index: number;
  local_name: string;
  conditions: Array<ICondition>;
  operations: Array<IOperation>;
}

export interface ITemplateBlock {
  global_index: number;
  block_index: number;
  local_name: string;
  template: string;
  data: Array<IRefData>;
  conditions: Array<ICondition>;
}

export interface IConditionBlock {
  global_index: number;
  block_index: number;
  conditions: Array<ICondition>;
  action: string;
  fail: IFailObj | null;
}

export interface ILoopBlock {
  global_index: number;
  block_index: number;
  local_name: string;
  min: IRefData;
  max: IRefData;
}

export interface IFilterBlock {
  global_index: number;
  block_index: number;
  local_name: string;
  ref_var: string;
  ref_property: string;
  filters: Array<IFilter>;
}

export interface IPropertyBlock {
  global_index: number;
  block_index: number;
  local_name: string;
  property: IProperty;
}

export interface IFunctionBlock {
  global_index: number;
  block_index: number;
  local_name: string;
  func: IFunction;
}

export interface IObjectBlock {
  global_index: number;
  block_index: number;
  local_name: string;
  pairs: Array<IObjectPair>;
}

export interface IUpdateBlock {
  global_index: number;
  block_index: number;
  ref_col: string;
  ref_property: string;
  save: boolean;
  targets: Array<IUpdateTarget>;
  add: IRefData | null;
  set: IRefData | null;
  filter: IFilter | null;
  conditions: Array<ICondition>;
}

export interface ICreateBlock {
  global_index: number;
  block_index: number;
  ref_col: string;
  ref_object: string;
  save: boolean;
  conditions: Array<ICondition>;
}

export interface IReturnBlock {
  global_index: number;
  block_index: number;
  pairs: Array<IObjectPair>;
  conditions: Array<ICondition>;
}

export interface IConditionPlain {
  right: IRefData;
  condition_type: string;
  not: boolean;
  next: string;
}

export interface ICondition {
  left: IRefData;
  right: IRefData;
  condition_type: string;
  not: boolean;
  next: string;
}

export interface IFailObj {
  status: number;
  message: string;
}

export interface IFilter {
  right: IRefData;
  operation_type: string;
  not: boolean;
  next: string;
}

export interface IFunction {
  id: string;
  params: Array<IRefData>;
}

export interface IObjectPair {
  id: string;
  data: IRefData;
}

export interface IOperation {
  left: IRefData;
  right: IRefData;
  operation_type: string;
  not: boolean;
  next: string;
}

export interface IProperty {
  data: IRefData;
  apply: string;
  additional: string;
}

export interface IRefData {
  ref_var: boolean;
  rtype: string;
  data: string;
}

export interface IUpdateTarget {
  field: string;
  conditions: Array<IConditionPlain>;
}

export interface IProcessFetchBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  local_name: string;
  ref_col: string;
}

export interface IProcessAssignmentBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  local_name: string;
  conditions: Array<ICondition>;
  operations: Array<IOperation>;
}

export interface IProcessTemplateBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  local_name: string;
  template: string;
  data: Array<IRefData>;
  conditions: Array<ICondition>;
}

export interface IProcessConditionBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  conditions: Array<ICondition>;
  action: string;
  fail: IFailObj | null;
}

export interface IProcessLoopBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  local_name: string;
  min: IRefData;
  max: IRefData;
}

export interface IProcessFilterBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  local_name: string;
  ref_var: string;
  ref_property: string;
  filters: Array<IFilter>;
}

export interface IProcessPropertyBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  local_name: string;
  property: IProperty;
}

export interface IProcessFunctionBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  local_name: string;
  func: IFunction;
}

export interface IProcessObjectBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  local_name: string;
  pairs: Array<IObjectPair>;
}

export interface IProcessUpdateBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  ref_col: string;
  ref_property: string;
  save: boolean;
  targets: Array<IUpdateTarget>;
  add: IRefData | null;
  set: IRefData | null;
  filter: IFilter | null;
  conditions: Array<ICondition>;
}

export interface IProcessCreateBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  ref_col: string;
  ref_object: string;
  save: boolean;
  conditions: Array<ICondition>;
}

export interface IProcessReturnBlock {
  id: string;
  name: string;
  global_index: number;
  block_index: number;
  pairs: Array<IObjectPair>;
  conditions: Array<ICondition>;
}

export type TMixedBlocks =
  | IProcessFetchBlock
  | IProcessAssignmentBlock
  | IProcessTemplateBlock
  | IProcessConditionBlock
  | IProcessLoopBlock
  | IProcessFilterBlock
  | IProcessPropertyBlock
  | IProcessFunctionBlock
  | IProcessObjectBlock
  | IProcessUpdateBlock
  | IProcessCreateBlock
  | IProcessReturnBlock;

export interface IComplexBlock {
  block_index: number;
  blocks: Array<TMixedBlocks>;
}
