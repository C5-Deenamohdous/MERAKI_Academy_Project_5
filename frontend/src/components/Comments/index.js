import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setBrand } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";

