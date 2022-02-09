import { request } from "@/utils/request";

export interface IFetchUserListResult {
  code: number;
  msg: string;
  result: {
    rows: {
      name: string;
      age: number;
      mobile: string;
      address: string;
      tags: string[];
      id: number;
    }[];
    total: number;
  };
}

export interface IFetchUserListParams {
  name?: string;
  page: number;
  size: number;
}

/**
 * 用户列表
 * http://yapi.smart-xwork.cn/project/129987/interface/api/1796953
 * @author 划水摸鱼糊屎工程师
 *
 * @param {IFetchUserListParams} params
 * @returns
 */
export function fetchUserList(params: IFetchUserListParams) {
  return request<IFetchUserListResult>({
    url: `http://127.0.0.1:3000/api/user/page`,
    method: "GET",
    params,
  });
}

export interface ICreateUserResult {
  code: number;
  msg: string;
  result: number;
}

export interface ICreateUserData {
  name: string;
  age: number;
  mobile: string;
  address?: string;
  tags?: string[];
}

/**
 * 添加用户
 * http://yapi.smart-xwork.cn/project/129987/interface/api/1796961
 * @author 划水摸鱼糊屎工程师
 *
 * @param {ICreateUserData} data
 * @returns
 */
export function createUser(data: ICreateUserData) {
  return request<ICreateUserResult>({
    url: `http://127.0.0.1:3000/api/user/create`,
    method: "POST",
    data,
  });
}

export interface IEditUserResult {
  code: number;
  msg: string;
  result: boolean;
}

export interface IEditUserData {
  name: string;
  age: number;
  mobile: string;
  address?: string;
  tags?: string[];
  id: number;
}

/**
 * 编辑用户
 * http://yapi.smart-xwork.cn/project/129987/interface/api/1796964
 * @author 划水摸鱼糊屎工程师
 *
 * @param {IEditUserData} data
 * @returns
 */
export function editUser(data: IEditUserData) {
  return request<IEditUserResult>({
    url: `http://127.0.0.1:3000/api/user/edit`,
    method: "POST",
    data,
  });
}

export interface IDelUserResult {
  code: number;
  msg: string;
  result: boolean;
}

export interface IDelUserParams {
  id: number;
}

/**
 * 删除用户
 * http://yapi.smart-xwork.cn/project/129987/interface/api/1796972
 * @author 划水摸鱼糊屎工程师
 *
 * @param {IDelUserParams} params
 * @returns
 */
export function delUser(params: IDelUserParams) {
  return request<IDelUserResult>({
    url: `http://127.0.0.1:3000/api/user/del`,
    method: "DELETE",
    params,
  });
}
