import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Table, Skeleton, Typography, ConfigProvider } from "antd";
import { useGetCompletedTestListQuery } from "modules/competed-test/redux/api";
import ruRU from "antd/es/locale/ru_RU";

import { format } from "date-fns";
import { ru } from "date-fns/locale";

const { Content } = Layout;
const { Title } = Typography;

export const CompletedTestListPage = () => {
  const { data: testList, isLoading, refetch } = useGetCompletedTestListQuery();

  const formatCompletionDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy, HH:mm", { locale: ru });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const columns = [
    {
      title: "Название теста",
      dataIndex: ["product", "title"],
      key: "title",
      sortDirections: ["ascend", "descend"],
      sorter: (a: any, b: any) =>
        a.product.title.localeCompare(b.product.title),
    },
    {
      title: "Набранные баллы",
      dataIndex: "correct_answers_count",
      key: "correct_answers_count",
      sortDirections: ["ascend", "descend"],
      sorter: (a: any, b: any) =>
        a.correct_answers_count - b.correct_answers_count,
    },
    {
      title: "Дата начала",
      dataIndex: "start_test_time",
      key: "start_test_time",
      render: (start_test_time: string) =>
        formatCompletionDate(start_test_time),
      sortDirections: ["ascend", "descend"],
      sorter: (a: any, b: any) =>
        new Date(a.start_test_time).getTime() -
        new Date(b.start_test_time).getTime(),
    },
    {
      title: "Дата завершения",
      dataIndex: "completed_date",
      key: "completed_date",
      render: (completed_date: string) => formatCompletionDate(completed_date),
      sortDirections: ["ascend", "descend"],
      sorter: (a: any, b: any) =>
        new Date(a.completed_date).getTime() -
        new Date(b.completed_date).getTime(),
    },
    {
      title: "",
      key: "actions",
      render: (record: any) => (
        <Link to={`/completed-test/${record.id}`}>
          Перейти к {record.product.title}
        </Link>
      ),
    },
  ];

  return (
    <ConfigProvider locale={ruRU}>
      <Layout>
        <Content className="page-layout">
          <Title level={1}>Результаты тестов</Title>
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 5 }} />
          ) : (
            <Table
              dataSource={testList}
              // @ts-ignore
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10, position: ["bottomCenter"] }} // Центрируем пагинацию
              bordered
            />
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
