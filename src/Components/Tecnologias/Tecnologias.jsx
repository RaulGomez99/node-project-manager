import React, { useEffect, useState, useCallback } from "react";
import TechDetails from "../TechDetails/TechDetails";
import Header from "../Header/Header";
import TechForm from "../TechForm/TechForm";

import { List, Avatar, Button, Skeleton, Card, Modal } from "antd";
import {
  PlusCircleOutlined
} from "@ant-design/icons";

import "./Tecnologias.css";
import Http from "../../Helpers/Http";

import { connect } from "react-redux";
import { readAllTechs } from "../../Redux/Reducers/TechReducer";
import {
  getAllTechs,
  selectedTech,
  createTech,
  removeTech,
  techEdit
} from "../../Redux/Actions/TechActions";
import TecnologiasListas from "../TecnologiasListas/TecnologiasListas";


const dataSource = [];

const Tecnologias = ({ getAllTechs, selectedTech }) => {

  const [showTechForm, setShowTechForm] = useState(false);

  const replenishTable = useCallback(async () => {
    const dataSource = await Http.get("/api/techs/findAllTechs");
    dataSource.unshift({
      id: "add",
      nombre: "Add",
      logo: "js.png",
      descripcion: "Añade technologia",
      version: "",
      creador: ""
    });

    getAllTechs(
      dataSource.map(item => {
        item.key = item.id;
        item.icon = require(`../../img/techs/${item.logo}`);
        return item;
      })
    );
    selectedTech(dataSource[1]);
  }, []);

  useEffect(() => {
    // Wait for loading data user
    //setLoading(true);

    replenishTable();
    //setLoading(false);
  }, [replenishTable]);

  return (
    <React.Fragment>
      <Header />

      <TecnologiasListas />

      <TechDetails />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { techs: readAllTechs(state) };
};

export default connect(mapStateToProps, {
  getAllTechs,
  selectedTech
})(Tecnologias);
