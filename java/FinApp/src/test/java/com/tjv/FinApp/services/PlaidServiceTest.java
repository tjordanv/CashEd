package com.tjv.FinApp.services;

import com.plaid.client.request.PlaidApi;
import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.model.Account;
import com.tjv.FinApp.model.PlaidToken;
import com.tjv.FinApp.model.Transaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.jdbc.core.JdbcTemplate;
import retrofit2.Response;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
    /*

@ExtendWith(MockitoExtension.class)
public class PlaidServiceTest {

    @Mock
    private UserDao userDao;

    @Mock
    private JdbcTemplate jdbcTemplate;

    @Mock
    private PlaidApi plaidClient;

    @InjectMocks
    private PlaidService plaidService;

    @BeforeEach
    public void setUp() {
        plaidService = new PlaidService(userDao, jdbcTemplate, plaidClient);
    }

    @Test
    public void testGetTransactionsWhenGivenAccessTokenThenReturnTransactions() throws Exception {
        // Arrange
        String accountIds = "1,2,3";
        PlaidToken accessToken = new PlaidToken(1, "testToken", "access token", 1);
        List<Transaction> expectedTransactions = new ArrayList<>();
        expectedTransactions.add(new Transaction());

        when(plaidClient.transactionsGet(any(TransactionsGetRequest.class))).thenReturn(Response.success(new TransactionsGetResponse()));

        // Act
        List<Transaction> actualTransactions = plaidService.getTransactions(accountIds, accessToken);

        // Assert
        verify(plaidClient, times(1)).transactionsGet(any(TransactionsGetRequest.class));
        assertThat(actualTransactions).isEqualTo(expectedTransactions);
    }

    @Test
    public void testGetTransactionsWhenGivenInvalidAccessTokenThenHandleException() {
        // Arrange
        String accountIds = "1,2,3";
        PlaidToken accessToken = new PlaidToken(1, "invalidToken", "access token", 1);

        when(plaidClient.transactionsGet(any(TransactionsGetRequest.class))).thenThrow(new RuntimeException());

        // Act and Assert
        try {
            plaidService.getTransactions(accountIds, accessToken);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(Exception.class).hasMessageContaining("Error occurred while retrieving transactions");
        }
    }
}
    * */
