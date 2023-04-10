package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.TestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

@Service
public class TestDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

   public TestModel getData() {
       TestModel model = new TestModel();
       String sql = "select city, price_range_lower from plans limit 1";
       SqlRowSet results = jdbcTemplate.queryForRowSet(sql);

       if(results.next()) {
           model = mapResultToModel(results);
       }
       return model;
   }

    private TestModel mapResultToModel(SqlRowSet result) {
        TestModel model = new TestModel();

        model.setCity(result.getString("city"));
        model.setMinimumPrice(result.getInt("price_range_lower"));

        return model;
    }
}
