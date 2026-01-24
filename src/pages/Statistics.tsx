import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ChartDataItem {
  date: string;
  main: number;
  catalog: number;
  apartments: number;
  about: number;
}

const Statistics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number>(7);

  const fetchStatistics = useCallback(async (days: number) => {
    setIsLoading(true);
    try {
      const { data: responseData, error: invokeError } = await supabase.functions.invoke("get-statistics", {
        body: { days }
      });
      
      if (invokeError) {
        console.error("Error fetching statistics:", invokeError);
        setError("Ошибка загрузки данных");
        return;
      }

      if (responseData?.error === "Forbidden") {
        navigate("/");
        return;
      }

      if (responseData?.data) {
        setData(responseData.data);
      }
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setError("Ошибка загрузки данных");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchStatistics(selectedDays);
  }, [selectedDays, fetchStatistics]);

  const renderChart = (title: string, dataKey: keyof ChartDataItem, color: string) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[250px] w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar 
                dataKey={dataKey} 
                fill={color} 
                radius={[4, 4, 0, 0]}
                name="Просмотры"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <Layout>
        <SEO title="Статистика" description="Статистика просмотров сайта" noIndex />
        <div className="pt-32 pb-16">
          <div className="container-custom">
            <p className="text-center text-muted-foreground">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="Статистика" description="Статистика просмотров сайта" noIndex />
      
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            Статистика просмотров
          </h1>
          
          <div className="flex flex-col items-center gap-4 mb-12">
            <RadioGroup
              defaultValue="7"
              onValueChange={(value) => setSelectedDays(Number(value))}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="7" id="days-7" />
                <Label htmlFor="days-7" className="cursor-pointer">7 дней</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="14" id="days-14" />
                <Label htmlFor="days-14" className="cursor-pointer">14 дней</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderChart("Главная страница", "main", "hsl(var(--primary))")}
            {renderChart("Каталог", "catalog", "hsl(220, 70%, 50%)")}
            {renderChart("Апартаменты", "apartments", "hsl(160, 60%, 45%)")}
            {renderChart("О нас", "about", "hsl(280, 60%, 50%)")}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Statistics;
